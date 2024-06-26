export const ExerciseTypeDef = `#graphql
    enum ExerciseEquipment {
        Barbell
        Dumbbell
        Machine
        Bodyweight
        Cable
        Other
    }

    enum ExerciseType {
        SetxRepxWeight
        SetxDuration
    }

    type Exercise {
        id: String!
        name: String!
        description: String
        muscle: String!
        equipment: ExerciseEquipment!
        type: ExerciseType!
        sets: Int!
        reps: Int!
        startingWeight: Int!
        incrementWeight: Float!
        incrementFrequency: Int!
        deloadPercentage: Int!
        deloadFrequency: Int!
    }

    input ExerciseInput {
        name: String!
        description: String
        muscle: String!
        equipment: ExerciseEquipment!
        type: ExerciseType!
        sets: Int!
        reps: Int!
        startingWeight: Int!
        incrementWeight: Float!
        incrementFrequency: Int!
        deloadPercentage: Int!
        deloadFrequency: Int!
    }
    
    # For Queries
    
    type ExerciseResponse {
        exercise: Exercise!
    }
    
    # For Mutations
    
    type CreateExerciseResponse {
        exercise: Exercise!
    }
    
    type UpdateExerciseResponse {
        name: String
        sets: Int
        reps: Int
        weight: Int
    }
    
    type DeleteExerciseResponse {
        message: String!
    }
    
    # Query and Mutation definitions
    
    extend type Query {
        getExercise(id: String!): ExerciseResponse!
        getExercises: [Exercise!]!
    }
    
    extend type Mutation {
        createExercise(exercise: ExerciseInput!): CreateExerciseResponse!
        updateExercise(id: String!, payload: ExerciseInput!): UpdateExerciseResponse!
        deleteExercise(id: String!): DeleteExerciseResponse!
    }
`;
