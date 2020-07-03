import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from './connection';

interface UserAttributes {
  id: number;
  name: string;
  preferredName: string | null;
  createdAt: Date;
  updatedAt: Date;
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public preferredName!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    preferredName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    tableName: 'user',
    modelName: 'User'
  }
);

export default User;
