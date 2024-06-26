import { Op } from 'sequelize';
import { Exercise } from '../models/Exercise';
import { Program, ProgramCreationDAO } from '../models/Program';
import { Workout } from '../models/Workout';

export const createProgram = async (program: ProgramCreationDAO) => {
  const workoutOrder = program.workouts.map((workout) => workout.name);
  const newProgram = await Program.create({ name: program.name, workoutSplit: program.workoutSplit, schedule: program.schedule, workoutOrder });

  for (let index = 0; index < program.workouts.length; index++) {
    const workout = program.workouts[index];

    const exercises = await Exercise.findAll({
      where: {
        id: {
          [Op.in]: [...workout.exerciseIds],
        },
      },
    });

    if (exercises.length !== workout.exerciseIds.length) {
      const missingExercises = workout.exerciseIds.filter((id) => !exercises.find((exercise) => exercise.id === id));

      await newProgram.destroy();
      throw new Error(`Exercises with ids [${missingExercises.join(', ')}] not found`);
    }

    const newWorkout = await Workout.create({
      name: workout.name,
      exerciseOrder: workout.exerciseIds,
    });

    await newWorkout.setExercises(exercises);

    await newProgram.addWorkout(newWorkout);
  }

  await newProgram.save();

  return newProgram;
};
