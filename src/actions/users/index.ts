import User from "@/models/user";

type createUserParams = {
  email: string;
  hash: string;
};
export const createUser = async ({ email, hash }: createUserParams) => {
  const user = new User({ email, hash });

  await user.save();

  return { id: user._id, ...user };
};

export const findUserByEmail = async (emailParam: string) => {
  const user = await User.findOne({ email: emailParam });
  if (!user) return null;

  const { _id: id, email, hash } = user;

  return { id, email, hash };
};

export const findUserById = async (idParam: string) => {
  const user = await User.findById(idParam);
  if (!user) return null;

  const { _id: id, email, hash } = user;

  return { id, email, hash };
};
