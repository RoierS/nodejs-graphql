import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { GraphQLContext } from './interfaces.js';
import { UserType } from './UserType.js';

export const PostType: GraphQLObjectType<{ authorId: string }, GraphQLContext> =
  new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
      id: { type: new GraphQLNonNull(UUIDType) },
      title: { type: new GraphQLNonNull(GraphQLString) },
      content: { type: new GraphQLNonNull(GraphQLString) },
      authorId: { type: new GraphQLNonNull(UUIDType) },

      author: {
        type: new GraphQLNonNull(UserType),
        resolve: async (parent: { authorId: string }, _args, context) => {
          return await context.prisma.user.findUnique({ where: { id: parent.authorId } });
        },
      },
    }),
  });
