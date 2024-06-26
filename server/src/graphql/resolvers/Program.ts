import { GraphQLError } from 'graphql';
import { createProgram } from '../../controllers/ProgramController';
import { isTokenValid } from '../../middleware/token';
import { getUserByAuthId } from '../../controllers/UserController';
import { Program } from '../../models/Program';
import { Workout } from '../../models/Workout';
import { User } from '../../models/User';

export const ProgramResolver = {
  WorkoutSplit: {
    FullBody: 'Full Body',
    UpperLower: 'Upper/Lower',
    PushPullLegs: 'Push/Pull/Legs',
    PushPull: 'Push Pull',
    BodyPartSplit: 'Body Part Split',
    Other: 'Other',
  },
  Schedule: {
    ONE: '1xWeek',
    TWO: '2xWeek',
    THREE: '3xWeek',
    FOUR: '4xWeek',
    FIVE: '5xWeek',
    SIX: '6xWeek',
    EveryOtherDay: 'Every Other Day',
  },
  Program: {
    Workouts: async (obj: Program, {}, context) => {
      const workouts = (await Program.findByPk(obj.id, { include: [{ model: Workout, as: 'Workouts' }] })).Workouts;

      workouts.reverse();

      return workouts;
    },
  },
  Query: {
    getPrograms: async (_, {}, context) => {
      const { token } = context;
      const jwtResult = await isTokenValid(token);

      if (jwtResult?.error || !jwtResult?.id) {
        throw new GraphQLError(jwtResult?.error.toString(), {
          extensions: {
            code: 'UNAUTHORIZED',
          },
        });
      }

      const authId = jwtResult.id;

      const user = await getUserByAuthId(authId);

      const programs = (await User.findByPk(user.id, { include: [{ model: Program, as: 'Programs' }] })).Programs;

      return programs;
    },
  },

  Mutation: {
    createProgram: async (_, { program }, context) => {
      const { token } = context;
      const jwtResult = await isTokenValid(token);

      if (jwtResult?.error || !jwtResult?.id) {
        throw new GraphQLError(jwtResult?.error.toString(), {
          extensions: {
            code: 'UNAUTHORIZED',
          },
        });
      }

      const authId = jwtResult.id;

      const user = await getUserByAuthId(authId);

      if (!user) {
        throw new GraphQLError('User not found', {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      }

      const exists = await Program.findOne({ where: { name: program.name } });

      if (exists) {
        throw new GraphQLError('Program with that name already exists', {
          extensions: {
            code: 'BAD_REQUEST',
          },
        });
      }

      const newProgram = await createProgram(program);

      await user.addProgram(newProgram);
      await user.save();

      return { program: newProgram };
    },
    deleteProgram: async (_, { id }, context) => {
      const { token } = context;
      const jwtResult = await isTokenValid(token);

      if (jwtResult?.error || !jwtResult?.id) {
        throw new GraphQLError(jwtResult?.error.toString(), {
          extensions: {
            code: 'UNAUTHORIZED',
          },
        });
      }

      const authId = jwtResult.id;

      const user = await getUserByAuthId(authId);

      if (!user) {
        throw new GraphQLError('User not found', {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      }

      const program = await Program.findByPk(id);

      if (!program) {
        throw new GraphQLError('Program not found', {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      }

      await user.removeProgram(program);
      await user.save();

      await program.destroy();

      return { message: 'Program deleted' };
    },

    updateProgram: async (_, { id, name, workoutSplit, schedule }, context) => {
      const { token } = context;
      const jwtResult = await isTokenValid(token);

      if (jwtResult?.error || !jwtResult?.id) {
        throw new GraphQLError(jwtResult?.error.toString(), {
          extensions: {
            code: 'UNAUTHORIZED',
          },
        });
      }

      const authId = jwtResult.id;

      const user = await getUserByAuthId(authId);

      if (!user) {
        throw new GraphQLError('User not found', {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      }

      const program = await Program.findByPk(id);

      if (!program) {
        throw new GraphQLError('Program not found', {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      }

      if (name) {
        program.name = name;
      }

      if (workoutSplit) {
        program.workoutSplit = workoutSplit;
      }

      if (schedule) {
        program.schedule = schedule;
      }

      await program.save();

      return program;
    },
  },
};
