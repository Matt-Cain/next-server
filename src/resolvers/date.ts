import { GraphQLError } from 'graphql';

const resolvers = {
  Date: {
    // Implement how your Date scalar is serialized to a string
    serialize(value: Date) {
      return value.toISOString(); // Assuming value is a JavaScript Date object
    },
    // Implement how your Date scalar is parsed from a string
    parseValue(value: string) {
      return new Date(value);
    },
    // Implement how your Date scalar is parsed from an AST node
    parseLiteral(ast: any) {
      if (ast.kind === 'StringValue') {
        return new Date(ast.value);
      }
      return null;
    },
  },
};

export default resolvers;