import { Op } from 'sequelize';
import { Exercise } from '../models/Exercise';
import { Program, ProgramCreationDAO } from '../models/Program';
import { Workout } from '../models/Workout';

export const createProgram = async (program: ProgramCreationDAO) => {
  const newProgram = await Program.create({ name: program.name, workoutSplit: program.workoutSplit, schedule: program.schedule });

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
      throw new Error('One or more exercises do not exist');
    }

    const newWorkout = await Workout.create({
      name: workout.name,
    });

    await newWorkout.setExercises(exercises);

    await newProgram.addWorkout(newWorkout);
  }

  await newProgram.save();

  return newProgram;
};
