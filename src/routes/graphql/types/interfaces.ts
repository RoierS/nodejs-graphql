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
