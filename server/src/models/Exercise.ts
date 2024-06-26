import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../db/connection';

export interface ExerciseCreationDAO {
  id: string;
  name: string;
  description: string;
  muscle: string;
  equipment: ExerciseEquipment;
  type: ExerciseType;
  sets: number;
  reps: number;
  startingWeight: number;
  incrementWeight: number;
  incrementFrequency: number;
  deloadPercentage: number;
  deloadFrequency: number;
}
export interface ExerciseUpdateDAO {
  name?: string;
  description?: string;
  muscle?: string;
  equipment?: ExerciseEquipment;
  type?: ExerciseType;
  sets?: number;
  reps?: number;
  startingWeight?: number;
  incrementWeight?: number;
  incrementFrequency?: number;
  deloadPercentage?: number;
  deloadFrequency?: number;
}

type ExerciseEquipment = 'Barbell' | 'Dumbbell' | 'Machine' | 'Bodyweight' | 'Cable' | 'Other';
type ExerciseType = 'SetxRepxWeight' | 'SetxDuration';

export class Exercise extends Model<InferAttributes<Exercise>, InferCreationAttributes<Exercise>> {
  public id!: string;
  public name!: string;
  public description: string;
  public muscle!: string;
  public equipment: ExerciseEquipment;
  public type: ExerciseType;
  public sets: number;
  public reps: number;
  public startingWeight: number;
  public incrementWeight: number;
  public incrementFrequency: number;
  public deloadPercentage: number;
  public deloadFrequency: number;

  public dateCreated?: Date;
  public updateTimestamp?: Date;
}

Exercise.init(
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
    description: {
      type: DataTypes.STRING,
    },
    muscle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    equipment: {
      type: DataTypes.ENUM('Barbell', 'Dumbbell', 'Machine', 'Bodyweight', 'Cable', 'Other'),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('SetxRepxWeight', 'SetxDuration'),
      allowNull: false,
    },
    sets: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reps: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startingWeight: {
      type: DataTypes.INTEGER,
    },
    incrementWeight: {
      type: DataTypes.FLOAT,
    },
    incrementFrequency: {
      type: DataTypes.INTEGER,
    },
    deloadPercentage: {
      type: DataTypes.FLOAT,
    },
    deloadFrequency: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    createdAt: 'dateCreated',
    updatedAt: 'updateTimestamp',
  }
);
