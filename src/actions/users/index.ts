import User from "@/models/user";

export const createUser = async ({ email, hash }) => {

  const user = new User({
    email, hash
  });

  await user.save();

  return { id: user._id, ...user }
};

export const findUserByEmail = async (email) => {
  const user = await User.findOne({ email }).exec();
  return { id: user._id, ...user }
}
