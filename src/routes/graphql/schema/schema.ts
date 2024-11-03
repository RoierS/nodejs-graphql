import { GraphQLSchema } from 'graphql';
import { RootQuery } from './RootQuery.js';

export const schema = new GraphQLSchema({
  query: RootQuery,
});
