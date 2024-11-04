import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { GraphQLContext } from './interfaces.js';
import { MemberType, MemberTypeId } from './MemberTypes.js';
import { UserType } from './UserType.js';
import { UUIDType } from './uuid.js';

export const ProfileType: GraphQLObjectType<
  { userId: string; memberTypeId: string },
  GraphQLContext
> = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberTypeId: { type: MemberTypeId },

    user: {
      type: UserType,
      resolve: async (parent, _args, context) =>
        await context.prisma.user.findUnique({ where: { id: parent.userId } }),
    },

    memberType: {
      type: MemberType,
      resolve: async (parent, _args, context) =>
        await context.prisma.memberType.findUnique({
          where: { id: parent.memberTypeId },
        }),
    },
  }),
});
