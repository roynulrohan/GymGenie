import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from '../resolvers';
import { UserTypeDef } from './User';
import { ProgramTypeDef } from './Program';
import { WorkoutTypeDef } from './Workout';
import { ExerciseTypeDef } from './Exercise';

export const schema = makeExecutableSchema({
  typeDefs: [UserTypeDef, ProgramTypeDef, WorkoutTypeDef, ExerciseTypeDef],
  resolvers,
});
