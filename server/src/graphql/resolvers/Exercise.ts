import { createExercise, getExercises } from '../../controllers/ExerciseController';
import { Exercise } from '../../models/Exercise';

export const ExerciseResolver = {
  Query: {
    getExercises: async (_, {}, context) => {
      const exercises = await getExercises();

      return exercises;
    },
  },

  Mutation: {
    createExercise: async (_, { exercise }, context) => {
      const exists = await Exercise.findOne({ where: { name: exercise.name } });

      if (exists) {
        throw new Error('Exercise with that name already exists');
      }

      const newExercise = await createExercise(exercise);

      return { exercise: newExercise };
    },
  },
};
