import { PrismaClient } from '@prisma/client';

export interface GraphQLContext {
  prisma: PrismaClient;
}

export interface ICreateUserInput {
  name: string;
  balance: number;
}

export interface ICreateProfileInput {
  userId: string;
  memberTypeId: string;
  isMale: boolean;
  yearOfBirth: number;
}

export interface ICreatePostInput {
  title: string;
  content: string;
  authorId: string;
}
