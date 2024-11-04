import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLInt,
} from 'graphql';
import {
  GraphQLContext,
  IChangePostInput,
  IChangeProfileInput,
  IChangeUserInput,
  ICreatePostInput,
  ICreateProfileInput,
  ICreateUserInput,
} from '../types/interfaces.js';
import { ProfileType } from '../types/ProfileType.js';
import { UserType } from '../types/UserType.js';
import { PostType } from '../types/PostType.js';
import { UUIDType } from '../types/uuid.js';
import { MemberTypeId } from '../types/MemberTypes.js';

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

        resolve: async (_parent, { dto }: { dto: ICreateUserInput }, context) => {
          return await context.prisma.user.create({
            data: dto,
          });
        },
      },

      changeUser: {
        type: UserType,
        args: {
          id: { type: new GraphQLNonNull(UUIDType) },
          dto: {
            type: new GraphQLNonNull(
              new GraphQLInputObjectType({
                name: 'ChangeUserInput',
                fields: () => ({
                  name: { type: GraphQLString },
                  balance: { type: GraphQLFloat },
                }),
              }),
            ),
          },
        },
        resolve: async (_parent, { id, dto }: IChangeUserInput, context) => {
          return await context.prisma.user.update({
            where: { id },
            data: dto,
          });
        },
      },

      deleteUser: {
        type: GraphQLBoolean,
        args: {
          id: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: async (_parent, { id }: { id: string }, context) =>
          !!(await context.prisma.user.delete({ where: { id } })),
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
                  userId: { type: new GraphQLNonNull(UUIDType) },
                  memberTypeId: { type: new GraphQLNonNull(MemberTypeId) },
                }),
              }),
            ),
          },
        },
        resolve: async (_parent, { dto }: { dto: ICreateProfileInput }, context) =>
          await context.prisma.profile.create({ data: dto }),
      },

      changeProfile: {
        type: ProfileType,
        args: {
          id: { type: new GraphQLNonNull(UUIDType) },
          dto: {
            type: new GraphQLNonNull(
              new GraphQLInputObjectType({
                name: 'ChangeProfileInput',
                fields: () => ({
                  isMale: { type: GraphQLBoolean },
                  yearOfBirth: { type: GraphQLInt },
                  memberTypeId: { type: MemberTypeId },
                }),
              }),
            ),
          },
        },
        resolve: async (_parent, { id, dto }: IChangeProfileInput, context) => {
          return await context.prisma.profile.update({
            where: { id },
            data: dto,
          });
        },
      },

      deleteProfile: {
        type: GraphQLBoolean,
        args: {
          id: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: async (_parent, { id }: { id: string }, context) =>
          !!(await context.prisma.profile.delete({ where: { id } })),
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

      changePost: {
        type: PostType,
        args: {
          id: { type: new GraphQLNonNull(UUIDType) },
          dto: {
            type: new GraphQLNonNull(
              new GraphQLInputObjectType({
                name: 'ChangePostInput',
                fields: () => ({
                  title: { type: GraphQLString },
                  content: { type: GraphQLString },
                }),
              }),
            ),
          },
        },
        resolve: async (_parent, { id, dto }: IChangePostInput, context) => {
          return await context.prisma.post.update({
            where: { id },
            data: dto,
          });
        },
      },

      deletePost: {
        type: GraphQLBoolean,
        args: {
          id: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: async (_parent, { id }: { id: string }, context) =>
          !!(await context.prisma.post.delete({ where: { id } })),
      },

      subscribeTo: {
        type: GraphQLBoolean,
        args: {
          userId: { type: new GraphQLNonNull(UUIDType) },
          authorId: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: async (
          _parent,
          { userId, authorId }: { userId: string; authorId: string },
          context,
        ) => {
          return !!(await context.prisma.user.update({
            where: { id: userId },
            data: {
              userSubscribedTo: {
                create: { authorId },
              },
            },
          }));

          // return true;
        },
      },

      unsubscribeFrom: {
        type: GraphQLBoolean,
        args: {
          userId: { type: new GraphQLNonNull(UUIDType) },
          authorId: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: async (_source, args: { userId: string; authorId: string }, context) =>
          !!(await context.prisma.subscribersOnAuthors.delete({
            where: {
              subscriberId_authorId: {
                subscriberId: args.userId,
                authorId: args.authorId,
              },
            },
          })),
      },
    }),
  });
