const resolvers = {
  Date: {
    serialize(value: Date) {
      return value.toISOString();
    },
    parseValue(value: string) {
      return new Date(value);
    },
    parseLiteral(ast: any) {
      if (ast.kind === 'StringValue') {
        return new Date(ast.value);
      }
      return null;
    },
  },
};

export default resolvers;
