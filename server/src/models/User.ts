import {
  CreationOptional,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyRemoveAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { sequelize } from '../db/connection';
import { Program } from './Program';

export interface UserCreationDAO {
  name: string;
  username: string;
  authId: string;
}

export interface UserUpdateDAO {
  name?: string;
  username?: string;
}

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  public id!: string;
  public authId: CreationOptional<string>;
  public name: CreationOptional<string>;
  public username: string;

  public readonly Programs?: Program[];
  public addProgram!: HasManyAddAssociationMixin<Program, string>;
  public removeProgram!: HasManyRemoveAssociationMixin<Program, string>;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    authId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    createdAt: 'dateCreated',
    updatedAt: 'updateTimestamp',
  }
);
