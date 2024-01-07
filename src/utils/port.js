export const getPort = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  return isProduction ? 3000 : 4000;
};
