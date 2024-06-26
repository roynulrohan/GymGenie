import { Exercise } from '../../models/Exercise';
import { Workout } from '../../models/Workout';

export const WorkoutResolver = {
  Workout: {
    Exercises: async (obj: Workout, {}, context) => {
      const exercises = (await Workout.findByPk(obj.id, { include: [{ model: Exercise, as: 'Exercises' }] })).Exercises;

      exercises.reverse();

      return exercises;
    },
  },
};
