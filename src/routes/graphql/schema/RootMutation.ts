import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLID,
} from 'graphql';
import {
  GraphQLContext,
  ICreatePostInput,
  ICreateProfileInput,
  ICreateUserInput,
} from '../types/interfaces.js';
import { ProfileType } from '../types/ProfileType.js';
import { UserType } from '../types/UserType.js';
import { PostType } from '../types/PostType.js';
import { UUIDType } from '../types/uuid.js';

export const RootMutation: GraphQLObjectType<unknown, GraphQLContext> =
  new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      createUser: {
        type: UserType,
        args: {
          dto: {
            type: new GraphQLNonNull(
              new GraphQLInputObjectType({
                name: 'CreateUserInput',
                fields: () => ({
                  name: { type: new GraphQLNonNull(GraphQLString) },
                  balance: { type: new GraphQLNonNull(GraphQLFloat) },
                }),
              }),
            ),
          },
        },

        resolve: async (_parent, { dto }: { dto: ICreateUserInput }, context) =>
          await context.prisma.user.create({ data: dto }),
      },

      deleteUser: {
        type: GraphQLBoolean,
        args: {
          id: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: async (_parent, { id }: { id: string }, context) =>
          await context.prisma.user.delete({ where: { id } }),
      },

      createProfile: {
        type: ProfileType,
        args: {
          dto: {
            type: new GraphQLNonNull(
              new GraphQLInputObjectType({
                name: 'CreateProfileInput',
                fields: () => ({
                  isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
                  yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
                  userId: { type: new GraphQLNonNull(GraphQLID) },
                  memberTypeId: { type: new GraphQLNonNull(GraphQLString) },
                }),
              }),
            ),
          },
        },
        resolve: async (_parent, { dto }: { dto: ICreateProfileInput }, context) =>
          await context.prisma.profile.create({ data: dto }),
      },

      deleteProfile: {
        type: GraphQLBoolean,
        args: {
          id: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: async (_parent, { id }: { id: string }, context) =>
          await context.prisma.profile.delete({ where: { id } }),
      },

      createPost: {
        type: PostType,
        args: {
          dto: {
            type: new GraphQLNonNull(
              new GraphQLInputObjectType({
                name: 'CreatePostInput',
                fields: () => ({
                  title: { type: new GraphQLNonNull(GraphQLString) },
                  content: { type: new GraphQLNonNull(GraphQLString) },
                  authorId: { type: new GraphQLNonNull(UUIDType) },
                }),
              }),
            ),
          },
        },
        resolve: async (_parent, { dto }: { dto: ICreatePostInput }, context) =>
          await context.prisma.post.create({ data: dto }),
      },

      deletePost: {
        type: GraphQLBoolean,
        args: {
          id: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: async (_parent, { id }: { id: string }, context) =>
          await context.prisma.post.delete({ where: { id } }),
      },
    }),
  });
