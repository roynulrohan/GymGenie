/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Date custom scalar type */
  Date: { input: any; output: any; }
};

export type CreateExerciseResponse = {
  __typename?: 'CreateExerciseResponse';
  exercise: Exercise;
};

export type CreateProgramResponse = {
  __typename?: 'CreateProgramResponse';
  program: Program;
};

export type CreateWorkoutResponse = {
  __typename?: 'CreateWorkoutResponse';
  workout: Workout;
};

export type DeleteExerciseResponse = {
  __typename?: 'DeleteExerciseResponse';
  message: Scalars['String']['output'];
};

export type DeleteProgramResponse = {
  __typename?: 'DeleteProgramResponse';
  message: Scalars['String']['output'];
};

export type DeleteUserResponse = {
  __typename?: 'DeleteUserResponse';
  message: Scalars['String']['output'];
};

export type DeleteWorkoutResponse = {
  __typename?: 'DeleteWorkoutResponse';
  message: Scalars['String']['output'];
};

export type Exercise = {
  __typename?: 'Exercise';
  deloadFrequency: Scalars['Int']['output'];
  deloadPercentage: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  equipment: ExerciseEquipment;
  id: Scalars['String']['output'];
  incrementFrequency: Scalars['Int']['output'];
  incrementWeight: Scalars['Float']['output'];
  muscle: Muscle;
  name: Scalars['String']['output'];
  reps: Scalars['Int']['output'];
  sets: Scalars['Int']['output'];
  startingWeight: Scalars['Int']['output'];
  type: ExerciseType;
};

export enum ExerciseEquipment {
  Barbell = 'Barbell',
  Bodyweight = 'Bodyweight',
  Cable = 'Cable',
  Dumbbell = 'Dumbbell',
  Machine = 'Machine',
  Other = 'Other'
}

export type ExerciseInput = {
  deloadFrequency: Scalars['Int']['input'];
  deloadPercentage: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  equipment: ExerciseEquipment;
  incrementFrequency: Scalars['Int']['input'];
  incrementWeight: Scalars['Float']['input'];
  muscle: Muscle;
  name: Scalars['String']['input'];
  reps: Scalars['Int']['input'];
  sets: Scalars['Int']['input'];
  startingWeight: Scalars['Int']['input'];
  type: ExerciseType;
};

export type ExerciseResponse = {
  __typename?: 'ExerciseResponse';
  exercise: Exercise;
};

export enum ExerciseType {
  SetxDuration = 'SetxDuration',
  SetxRepxWeight = 'SetxRepxWeight'
}

export enum Muscle {
  Abs = 'Abs',
  Arms = 'Arms',
  Back = 'Back',
  Chest = 'Chest',
  Legs = 'Legs',
  Other = 'Other',
  Shoulders = 'Shoulders'
}

export type Mutation = {
  __typename?: 'Mutation';
  createExercise: CreateExerciseResponse;
  createProgram: CreateProgramResponse;
  createWorkout: CreateWorkoutResponse;
  deleteExercise: DeleteExerciseResponse;
  deleteProgram: DeleteProgramResponse;
  deleteUser: DeleteUserResponse;
  deleteWorkout: DeleteWorkoutResponse;
  signup: UserResponse;
  updateExercise: UpdateExerciseResponse;
  updateProgram: UpdateProgramResponse;
  updateUser: UserResponse;
  updateWorkout: UpdateWorkoutResponse;
};


export type MutationCreateExerciseArgs = {
  exercise: ExerciseInput;
};


export type MutationCreateProgramArgs = {
  program: ProgramInput;
};


export type MutationCreateWorkoutArgs = {
  exercises: Array<ExerciseInput>;
  name: Scalars['String']['input'];
};


export type MutationDeleteExerciseArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteProgramArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteWorkoutArgs = {
  id: Scalars['String']['input'];
};


export type MutationSignupArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
};


export type MutationUpdateExerciseArgs = {
  id: Scalars['String']['input'];
  payload: ExerciseInput;
};


export type MutationUpdateProgramArgs = {
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  schedule?: InputMaybe<Schedule>;
  workoutSplit?: InputMaybe<WorkoutSplit>;
};


export type MutationUpdateUserArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateWorkoutArgs = {
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Program = {
  __typename?: 'Program';
  Workouts: Array<Workout>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  schedule: Scalars['String']['output'];
  workoutSplit: Scalars['String']['output'];
};

export type ProgramInput = {
  name: Scalars['String']['input'];
  schedule: Schedule;
  workoutSplit: WorkoutSplit;
  workouts: Array<WorkoutInput>;
};

export type ProgramResponse = {
  __typename?: 'ProgramResponse';
  program: Program;
};

export type ProgramsResponse = {
  __typename?: 'ProgramsResponse';
  customPrograms?: Maybe<Array<Program>>;
  presetPrograms?: Maybe<Array<Program>>;
};

export type Query = {
  __typename?: 'Query';
  getExercise: ExerciseResponse;
  getExercises: Array<Exercise>;
  getProgramByName: ProgramResponse;
  getPrograms: ProgramsResponse;
  getUser: UserResponse;
  getUserByAuthId: UserResponse;
  getUserById: UserResponse;
  getWorkout: WorkoutResponse;
  validateUsername: ValidateUsernameResponse;
  verifyToken: VerifyTokenResponse;
};


export type QueryGetExerciseArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetProgramByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryGetUserByAuthIdArgs = {
  authId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetUserByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetWorkoutArgs = {
  id: Scalars['String']['input'];
};


export type QueryValidateUsernameArgs = {
  username: Scalars['String']['input'];
};

export enum Schedule {
  EveryOtherDay = 'EveryOtherDay',
  Five = 'FIVE',
  Four = 'FOUR',
  One = 'ONE',
  Six = 'SIX',
  Three = 'THREE',
  Two = 'TWO'
}

export type SignUpResponse = {
  __typename?: 'SignUpResponse';
  user: User;
};

export type UpdateExerciseResponse = {
  __typename?: 'UpdateExerciseResponse';
  name?: Maybe<Scalars['String']['output']>;
  reps?: Maybe<Scalars['Int']['output']>;
  sets?: Maybe<Scalars['Int']['output']>;
  weight?: Maybe<Scalars['Int']['output']>;
};

export type UpdateProgramResponse = {
  __typename?: 'UpdateProgramResponse';
  name?: Maybe<Scalars['String']['output']>;
  schedule?: Maybe<Scalars['String']['output']>;
  workoutSplit?: Maybe<Scalars['String']['output']>;
};

export type UpdateWorkoutResponse = {
  __typename?: 'UpdateWorkoutResponse';
  name?: Maybe<Scalars['String']['output']>;
};

export type User = {
  __typename?: 'User';
  Programs?: Maybe<Array<Program>>;
  authId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  user: User;
};

export type ValidateUsernameResponse = {
  __typename?: 'ValidateUsernameResponse';
  isAvailable: Scalars['Boolean']['output'];
};

export type VerifyTokenResponse = {
  __typename?: 'VerifyTokenResponse';
  valid: Scalars['Boolean']['output'];
};

export type Workout = {
  __typename?: 'Workout';
  Exercises?: Maybe<Array<Exercise>>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type WorkoutInput = {
  exerciseIds: Array<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type WorkoutResponse = {
  __typename?: 'WorkoutResponse';
  workout: Workout;
};

export enum WorkoutSplit {
  BodyPartSplit = 'BodyPartSplit',
  FullBody = 'FullBody',
  Other = 'Other',
  PushPull = 'PushPull',
  PushPullLegs = 'PushPullLegs',
  UpperLower = 'UpperLower'
}

export type UserUpdatedResponse = {
  __typename?: 'userUpdatedResponse';
  name?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type VerifyTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type VerifyTokenQuery = { __typename?: 'Query', verifyToken: { __typename?: 'VerifyTokenResponse', valid: boolean } };


export const VerifyTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VerifyToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"valid"}}]}}]}}]} as unknown as DocumentNode<VerifyTokenQuery, VerifyTokenQueryVariables>;