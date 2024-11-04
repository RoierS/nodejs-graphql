import { GraphQLSchema } from 'graphql';
import { RootQuery } from './RootQuery.js';
import { RootMutation } from './RootMutation.js';

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
