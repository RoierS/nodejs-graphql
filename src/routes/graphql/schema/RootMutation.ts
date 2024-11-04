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
  ICreateProfileInput,
  ICreateUserInput,
} from '../types/interfaces.js';
import { ProfileType } from '../types/ProfileType.js';
import { UserType } from '../types/UserType.js';

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
                fields: {
                  name: { type: new GraphQLNonNull(GraphQLString) },
                  balance: { type: new GraphQLNonNull(GraphQLFloat) },
                },
              }),
            ),
          },
        },

        resolve: async (_parent, { dto }: { dto: ICreateUserInput }, context) =>
          await context.prisma.user.create({ data: dto }),
      },

      createProfile: {
        type: ProfileType,
        args: {
          dto: {
            type: new GraphQLNonNull(
              new GraphQLInputObjectType({
                name: 'CreateProfileInput',
                fields: {
                  isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
                  yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
                  userId: { type: new GraphQLNonNull(GraphQLID) },
                  memberTypeId: { type: new GraphQLNonNull(GraphQLString) },
                },
              }),
            ),
          },
        },
        resolve: (_parent, { dto }: { dto: ICreateProfileInput }, context) =>
          context.prisma.profile.create({ data: dto }),
      },
    }),
  });
