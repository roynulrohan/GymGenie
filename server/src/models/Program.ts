import { DataTypes, HasManyAddAssociationMixin, HasManyRemoveAssociationMixin, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../db/connection';
import { Workout, WorkoutCreationDAO } from './Workout';
import { User } from './User';

export interface ProgramCreationDAO {
  name: string;
  workoutSplit: string;
  schedule: string;
  workouts: WorkoutCreationDAO[];
}

export interface ProgramUpdateDAO {
  name?: string;
  workoutSplit?: string;
  schedule?: string;
}

export class Program extends Model<InferAttributes<Program>, InferCreationAttributes<Program>> {
  public id!: string;
  public name!: string;
  public workoutSplit!: string;
  public schedule!: string;

  public workoutOrder: string[];

  public readonly Workouts?: Workout[];
  public addWorkout!: HasManyAddAssociationMixin<Workout, string>;
  public removeWorkout!: HasManyRemoveAssociationMixin<Workout, string>;

  declare userId: string;
}

Program.init(
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
    workoutSplit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    schedule: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: 'id',
      },
    },
    workoutOrder: {
      type: DataTypes.JSON,
    },
  },
  {
    sequelize,
    createdAt: 'dateCreated',
    updatedAt: 'updateTimestamp',
  }
);
