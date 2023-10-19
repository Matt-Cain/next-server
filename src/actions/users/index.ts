import User from '../../models/user';

type CreateUserParams = {
  email: string;
  hash: string;
};
export const createUser = async ({ email, hash }: CreateUserParams) => {
  const user = new User({ email, hash });

  await user.save();

  const { _id: id } = user;
  return { id, ...user };
};

export const findUserByEmail = async (emailParam: string) => {
  const user = await User.findOne({ email: emailParam });
  if (!user) return null;

  const { _id: id, email, hash } = user;

  return { id, email, hash };
};

export const findUserById = async (idParam: any) => {
  const user = await User.findById(idParam);
  if (!user) return null;

  const { _id: id, email, hash } = user;

  return { id, email, hash };
};
