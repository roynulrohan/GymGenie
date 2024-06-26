import { Exercise } from '../../models/Exercise';
import { Workout } from '../../models/Workout';

export const WorkoutResolver = {
  Workout: {
    Exercises: async (obj: Workout, {}, context) => {
      const exercises = (await Workout.findByPk(obj.id, { include: [{ model: Exercise, as: 'Exercises' }] })).Exercises;

      if (obj.exerciseOrder) {
        exercises.sort((a, b) => {
          return obj.exerciseOrder.indexOf(a.id) - obj.exerciseOrder.indexOf(b.id);
        });
      }

      return exercises;
    },
  },
};
