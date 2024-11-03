import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { GraphQLContext } from '../types/interfaces.js';
import { MemberType, MemberTypeIdEnum } from '../types/MemberTypes.js';

export const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: async (_parent, _args, context: GraphQLContext) => {
        return await context.prisma.memberType.findMany();
      },
    },
    memberType: {
      type: MemberType,
      args: { id: { type: new GraphQLNonNull(MemberTypeIdEnum) } },
      resolve: async (_parent, args: { id: string }, context: GraphQLContext) => {
        return await context.prisma.memberType.findUnique({
          where: { id: args.id },
        });
      },
    },
  }),
});
