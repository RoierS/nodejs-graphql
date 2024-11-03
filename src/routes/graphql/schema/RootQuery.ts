import { GraphQLList, GraphQLObjectType } from 'graphql';
import { GraphQLContext } from '../types/interfaces.js';
import { MemberType } from '../types/MemberTypes.js';

export const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: async (_parent, _args, context: GraphQLContext) => {
        return await context.prisma.memberType.findMany();
      },
    },
  }),
});
