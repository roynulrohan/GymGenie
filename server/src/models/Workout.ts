import { DataTypes, HasManySetAssociationsMixin, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../db/connection';
import { Exercise } from './Exercise';

export interface WorkoutCreationDAO {
  name: string;
  exerciseIds: string[];
}
export interface WorkoutUpdateDAO {
  name?: string;
}

export class Workout extends Model<InferAttributes<Workout>, InferCreationAttributes<Workout>> {
  public id!: string;
  public name!: string;

  public readonly Exercises?: Exercise[];
  public setExercises!: HasManySetAssociationsMixin<Exercise, string>;
}

Workout.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    createdAt: 'dateCreated',
    updatedAt: 'updateTimestamp',
  }
);
