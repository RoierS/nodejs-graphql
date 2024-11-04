import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { GraphQLContext } from '../types/interfaces.js';
import { MemberType, MemberTypeId } from '../types/MemberTypes.js';
import { PostType } from '../types/PostType.js';
import { UUIDType } from '../types/uuid.js';
import { UserType } from '../types/UserType.js';
import { ProfileType } from '../types/ProfileType.js';

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
      type: new GraphQLNonNull(MemberType),
      args: { id: { type: new GraphQLNonNull(MemberTypeId) } },
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
      resolve: async (_parent, args: { id: string }, context: GraphQLContext) => {
        return await context.prisma.post.findUnique({
          where: { id: args.id },
        });
      },
    },

    users: {
      type: new GraphQLList(UserType),
      resolve: async (_parent, _args, context: GraphQLContext) => {
        return await context.prisma.user.findMany({
          include: {
            userSubscribedTo: true,
            subscribedToUser: true,
          },
        });
      },
    },

    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_parent, args: { id: string }, context: GraphQLContext) => {
        return await context.prisma.user.findUnique({
          where: { id: args.id },
        });
      },
    },

    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async (_parent, _args, context: GraphQLContext) =>
        await context.prisma.profile.findMany(),
    },

    profile: {
      type: ProfileType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_parent, args: { id: string }, context: GraphQLContext) => {
        return await context.prisma.profile.findUnique({
          where: { id: args.id },
        });
      },
    },
  }),
});
