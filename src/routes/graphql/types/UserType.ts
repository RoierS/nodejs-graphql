import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { GraphQLContext } from './interfaces.js';
import { ProfileType } from './ProfileType.js';
import { PostType } from './PostType.js';

export const UserType: GraphQLObjectType<{ id: string }, GraphQLContext> =
  new GraphQLObjectType({
    name: 'User',
    fields: () => ({
      id: { type: new GraphQLNonNull(UUIDType) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      balance: { type: new GraphQLNonNull(GraphQLFloat) },

      profile: {
        type: ProfileType,
        resolve: async (parent, _args, context) => {
          return await context.prisma.profile.findUnique({
            where: { userId: parent.id },
          });
        },
      },

      posts: {
        type: new GraphQLList(PostType),
        resolve: async (parent, _args, context) => {
          return await context.prisma.post.findMany({ where: { authorId: parent.id } });
        },
      },

      userSubscribedTo: {
        type: new GraphQLList(UserType),
        resolve: async (parent, _args, context) => {
          const authors = await context.prisma.subscribersOnAuthors.findMany({
            where: { subscriberId: parent.id },
            select: { author: true },
          });

          return authors.map(({ author }) => author);
        },
      },

      subscribedToUser: {
        type: new GraphQLList(UserType),
        resolve: async (parent, _args, context) => {
          const subscribers = await context.prisma.subscribersOnAuthors.findMany({
            where: {
              authorId: parent.id,
            },
            select: { subscriber: true },
          });

          return subscribers.map(({ subscriber }) => subscriber);
        },
      },
    }),
  });
