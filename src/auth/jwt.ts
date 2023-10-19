// function to set jwts
// see https://www.richardkotze.com/coding/json-web-tokens-using-apollo-graphql
import { Types } from 'mongoose';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

const { sign, verify } = jwt;

type User = {
  id: Types.ObjectId;
  email: string;
  hash: string;
};

export const setTokens = (id: any) => {
  // if you want to include more than the user's id in the JWT then include it here
  const user = { user: { id } };
  const accessToken = sign(user, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: process.env.ACCESS_TOKEN_DURATION,
  });
  const refreshToken = sign(user, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: process.env.REFRESH_TOKEN_DURATION,
  });
  console.log({ accessToken, refreshToken });
  return { id, accessToken, refreshToken };
};

// the following two functions wrap verify() in a try/catch to muffle expired jwt errors
export const validateAccessToken = (token: string) => {
  try {
    return verify(token, process.env.ACCESS_TOKEN_SECRET as string);
  } catch (error: any) {
    if ((error.message as string) !== 'jwt expired')
      console.error(`Access token error: ${error.message}`);
  }
  return null;
};

export const validateRefreshToken = (token: string) => {
  try {
    return verify(token, process.env.REFRESH_TOKEN_SECRET as string);
  } catch (error: any) {
    if (error.message !== 'jwt expired')
      console.error(`Refresh token error: ${error.message}`);
  }
  return null;
};

export const comparePromise = (password: string, hash: string) =>
  new Promise((resolve, reject) => {
    compare(password, hash, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
