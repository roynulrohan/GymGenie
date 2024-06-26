export const ProgramTypeDef = `#graphql
    type Program {
        id: String!
        name: String!
        workoutSplit: String!
        schedule: String!
        Workouts: [Workout!]!
    }

    enum WorkoutSplit {
        FullBody
        UpperLower
        PushPullLegs
        PushPull
        BodyPartSplit
        Other
    }

    enum Schedule {
        ONE 
        TWO 
        THREE 
        FOUR 
        FIVE 
        SIX 
        EveryOtherDay
    }

    input ProgramInput {
        name: String!
        workoutSplit: WorkoutSplit!
        schedule: Schedule!
        
        workouts: [WorkoutInput!]!
    }

    
    # For Queries

    type ProgramsResponse {
        presetPrograms: [Program!]
        customPrograms: [Program!]
    }
    
    type ProgramResponse {
        program: Program!
    }
    
    # For Mutations
    
    type CreateProgramResponse {
        program: Program!
    }
    
    type UpdateProgramResponse {
        name: String
        workoutSplit: String
        schedule: String
    }
    
    type DeleteProgramResponse {
        message: String!
    }
    
    # Query and Mutation definitions
    
    extend type Query {
        getPrograms: ProgramsResponse!
        getProgramByName(name: String!): ProgramResponse!
    }
    
    extend type Mutation {
        createProgram(program:ProgramInput!): CreateProgramResponse!
        updateProgram(id: String!, name: String, workoutSplit: WorkoutSplit, schedule: Schedule): UpdateProgramResponse!
        deleteProgram(id: String!): DeleteProgramResponse!
    }
`;
