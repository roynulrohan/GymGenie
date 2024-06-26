import { Exercise, ExerciseCreationDAO } from '../models/Exercise';

export const getExercises = async () => {
  const exercises = await Exercise.findAll();

  return exercises;
};

export const createExercise = async (exercise: ExerciseCreationDAO) => {
  const newExercise = await Exercise.create(exercise);

  return newExercise;
};
