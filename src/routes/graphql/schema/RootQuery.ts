import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { GraphQLContext } from '../types/interfaces.js';
import { MemberType, MemberTypeIdEnum } from '../types/MemberTypes.js';
import { PostType } from '../types/PostType.js';
import { UUIDType } from '../types/uuid.js';

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

    posts: {
      type: new GraphQLList(PostType),
      resolve: async (_parent, _args, context: GraphQLContext) => {
        return await context.prisma.post.findMany();
      },
    },

    post: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, args: { id: string }, context: GraphQLContext) => {
        return await context.prisma.post.findUnique({
          where: { id: args.id },
        });
      },
    },
  }),
});
