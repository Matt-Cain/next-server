import { genSaltSync, hashSync } from "bcrypt";
const saltRounds = 13; // just to be unusual

export const genHash = (str: string) => {
  const salt = genSaltSync(saltRounds);
  return hashSync(str, salt);
};
