import {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql';
import { ProfileType } from './ProfileType.js';
import { GraphQLContext } from './interfaces.js';

export const MemberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    BASIC: { value: 'BASIC' },
    BUSINESS: { value: 'BUSINESS' },
  },
});

export const MemberType: GraphQLObjectType<{ id: string }, GraphQLContext> =
  new GraphQLObjectType({
    name: 'MemberType',
    fields: () => ({
      id: { type: new GraphQLNonNull(MemberTypeId) },
      discount: { type: new GraphQLNonNull(GraphQLFloat) },
      postsLimitPerMonth: { type: new GraphQLNonNull(GraphQLInt) },

      profiles: {
        type: new GraphQLList(ProfileType),
        resolve: async (parent: { id: string }, _args, context) => {
          return await context.prisma.profile.findMany({
            where: { memberTypeId: parent.id },
          });
        },
      },
    }),
  });
