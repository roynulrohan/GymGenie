export const WorkoutTypeDef = `#graphql
    type Workout {
        id: String!
        name: String!
        Exercises: [Exercise!]
    }

    input WorkoutInput {
        name: String!
        exerciseIds: [String!]!
    }
    
    # For Queries
    
    type WorkoutResponse {
        workout: Workout!
    }
    
    # For Mutations
    
    type CreateWorkoutResponse {
        workout: Workout!
    }
    
    type UpdateWorkoutResponse {
        name: String
    }
    
    type DeleteWorkoutResponse {
        message: String!
    }
    
    # Query and Mutation definitions
    
    extend type Query {
        getWorkout(id: String!): WorkoutResponse!
    }
    
    extend type Mutation {
        createWorkout(name: String!, exercises: [ExerciseInput!]!): CreateWorkoutResponse!
        updateWorkout(id: String!, name: String): UpdateWorkoutResponse!
        deleteWorkout(id: String!): DeleteWorkoutResponse!
    }
`;
