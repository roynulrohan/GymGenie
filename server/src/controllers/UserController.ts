import { User, UserCreationDAO, UserUpdateDAO } from '../models/User';

export const getUserByAuthId = async (authId: string) => {
  const user = await User.findOne({
    where: {
      authId,
    },
  });

  return user;
};

export const getUserById = async (id: string) => {
  const user = await User.findOne({
    where: {
      id,
    },
  });

  return user;
};

export const getUserByUsername = async (username: string) => {
  const user = await User.findOne({
    where: {
      username,
    },
  });

  return user;
};

export const createUser = async ({ authId, username, name }: UserCreationDAO) => {
  const doesUserExist = await getUserByAuthId(authId);

  if (doesUserExist) {
    throw { status: 409, message: 'Duplicate Entry' };
  }

  const newUser = await User.create({ authId, username, name });

  return newUser;
};

export const updateUser = async (authId: string, data: UserUpdateDAO) => {
  const user = await getUserByAuthId(authId);

  await user.update(data);
  await user.reload();

  return user;
};

export const deleteUser = async (authId: string) => {
  const user = await getUserByAuthId(authId);

  await user.destroy();

  return { message: 'User deleted' };
};
