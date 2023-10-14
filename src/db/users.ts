export interface User {
  id: number;
  email: string;
  hash: string;
}

export const users = [
  {
    id: 1,
    email: 'foo',
    hash: '$2b$11$Jc404/6L0GJ6glN3Ow.5huXuraZKFkAV7vv4.LOg7DRscbLQmxoGS', // 'notArealPassword'
  },
  {
    id: 2,
    email: 'twiddle',
    hash: '$2b$11$AsFCQi.suXHSUY4UDMN0veUJO6Zf8KxoUkBlVcXDqJ0irA4zikeuK', // 'notArealPasswordEither'
  },
];

export const findUserByEmail = (email) =>
  users.find((user) => user.email === email);

export const findUserById = (id) => users.find((user) => user.id === id);