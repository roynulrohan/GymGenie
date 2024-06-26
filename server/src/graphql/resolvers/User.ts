import { GraphQLError } from 'graphql';
import { redis } from '../../db/redis';
import { isTokenValid } from '../../middleware/token';
import { Program } from '../../models/Program';
import { User } from '../../models/User';
import { deleteUser, getUserByAuthId, getUserById, getUserByUsername, updateUser } from '../../controllers/UserController';

export const UserResolver = {
  User: {
    Programs: async (obj: User, {}, context) => {
      const programs = (await User.findByPk(obj.id, { include: [{ model: Program, as: 'Programs' }] })).Programs;

      return programs;
    },
  },

  Query: {
    verifyToken: async (_, {}, context) => {
      const { token } = context;

      const jwtResult = await isTokenValid(token);

      if (jwtResult?.error || !jwtResult?.id) {
        throw new GraphQLError(jwtResult?.error.toString(), {
          extensions: {
            code: 'UNAUTHORIZED',
          },
        });
      }

      return { valid: true };
    },

    getUser: async (_, {}, context) => {
      const { token } = context;

      const jwtResult = await isTokenValid(token);

      if (jwtResult?.error || !jwtResult?.id) {
        throw new GraphQLError(jwtResult?.error.toString(), {
          extensions: {
            code: 'UNAUTHORIZED',
          },
        });
      }

      const cachedUser = await redis.get(`user:${jwtResult.id}`);

      if (cachedUser) {
        return { user: JSON.parse(cachedUser) };
      } else {
        const user = await getUserByAuthId(jwtResult.id);

        if (!user) {
          throw new GraphQLError('User not found');
        }

        await redis.set(`user:${jwtResult.id}`, JSON.stringify(user), 'EX', 300);

        return { user };
      }
    },

    getUserByAuthId: async (_, { authId }, context) => {
      if (!authId && !context.token) {
        throw new GraphQLError('Unauthorized', {
          extensions: {
            code: 'UNAUTHORIZED',
          },
        });
      }

      const { token } = context;

      const jwtResult = await isTokenValid(token);

      let authIdToUse = jwtResult.id;

      if (jwtResult?.error || !jwtResult?.id) {
        authIdToUse = authId;
      }

      const cachedUser = await redis.get(`user:${authIdToUse}`);

      if (cachedUser) {
        return { user: JSON.parse(cachedUser) };
      } else {
        const user = await getUserByAuthId(authIdToUse);

        if (!user) {
          throw new GraphQLError('User not found');
        }

        await redis.set(`user:${authIdToUse}`, JSON.stringify(user), 'EX', 300);

        return { user };
      }
    },

    getUserById: async (_, { id }, context) => {
      if (!id) {
        throw new GraphQLError('Id missing', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const cachedUser = await redis.get(`user:${id}`);

      if (cachedUser) {
        return { user: JSON.parse(cachedUser) };
      } else {
        const user = await getUserById(id);

        if (!user) {
          throw new GraphQLError('User not found');
        }

        await redis.set(`user:${id}`, JSON.stringify(user), 'EX', 300);

        return { user };
      }
    },

    validateUsername: async (_, { username }) => {
      if (!username) {
        throw new GraphQLError('Username missing', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const cachedUser = await redis.get(`user:${username}`);

      if (cachedUser) {
        return { isAvailable: false };
      } else {
        const user = await getUserByUsername(username);

        await redis.set(`user:${username}`, JSON.stringify(user), 'EX', 300);

        if (!user) {
          return { isAvailable: true };
        }

        return { isAvailable: false };
      }
    },
  },
  Mutation: {
    signup: async (_, { username, name }, context) => {
      const { token } = context;

      const jwtResult = await isTokenValid(token);

      if (jwtResult?.error || !jwtResult?.id) {
        throw new GraphQLError(jwtResult?.error.toString(), {
          extensions: {
            code: 'UNAUTHORIZED',
          },
        });
      }

      if (!username) {
        throw new GraphQLError('Username missing', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const userExists = await getUserByUsername(username);

      if (userExists) {
        throw new GraphQLError('Username taken', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      let user = await User.create({ authId: jwtResult.id, username, name });

      return { user };
    },
    updateUser: async (_, { username, name, location, profilePicture }, context) => {
      const { token } = context;

      const jwtResult = await isTokenValid(token);

      if (jwtResult?.error || !jwtResult?.id) {
        throw new GraphQLError(jwtResult?.error.toString(), {
          extensions: {
            code: 'UNAUTHORIZED',
          },
        });
      }

      const user = await getUserByAuthId(jwtResult.id);

      if (!user) {
        throw new GraphQLError('User not found', {
          extensions: {
            code: 'PERSISTED_QUERY_NOT_FOUND',
          },
        });
      }

      if (username) {
        if (username !== user.username) {
          if (await getUserByUsername(username)) {
            throw new GraphQLError('Username taken', {
              extensions: {
                code: 'BAD_USER_INPUT',
              },
            });
          }

          if (username.match('[^a-zA-Z0-9._\\-]')) {
            throw new GraphQLError('Username Invalid', {
              extensions: {
                code: 'BAD_USER_INPUT',
              },
            });
          }

          if (username.length > 30) {
            throw new GraphQLError('Username is too long (Max 30)', {
              extensions: {
                code: 'BAD_USER_INPUT',
              },
            });
          }

          if (username.length < 2) {
            throw new GraphQLError('Username is too short (Min 2)', {
              extensions: {
                code: 'BAD_USER_INPUT',
              },
            });
          }
        }
      }

      try {
        await updateUser(jwtResult.id, { name, username });
        await user.reload();
        await redis.set(`user:${user.id}`, JSON.stringify(user), 'EX', 300);
        await redis.set(`user:${user.username}`, JSON.stringify(user), 'EX', 300);
        await redis.set(`user:${user.authId}`, JSON.stringify(user), 'EX', 300);
        return { user };
      } catch (e) {
        console.error(e);

        throw new GraphQLError(e.message, {
          extensions: {
            code: 'SQL_ERROR',
          },
        });
      }
    },

    deleteUser: async (_, {}, context) => {
      const { token } = context;

      const jwtResult = await isTokenValid(token);

      if (jwtResult?.error || !jwtResult?.id) {
        throw new GraphQLError(jwtResult?.error.toString(), {
          extensions: {
            code: 'UNAUTHORIZED',
          },
        });
      }

      const user = await getUserByAuthId(jwtResult.id);

      if (!user) {
        throw new GraphQLError('User not found', {
          extensions: {
            code: 'PERSISTED_QUERY_NOT_FOUND',
          },
        });
      }

      await deleteUser(jwtResult.id);

      return { message: 'Account successfully deleted' };
    },
  },
};
