import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Job from './Job';

class Application extends Model {
  public id!: number;
  public userId!: number; // Foreign key for Users
  public jobId!: number;  // Foreign key for Jobs
  public status!: string;
}

Application.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
    jobId: {
      type: DataTypes.INTEGER,
      references: {
        model: Job,
        key: 'id',
      },
    },
    status: {
      type: DataTypes.ENUM('applied', 'interview', 'hired', 'rejected'),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'applications',
  }
);

export default Application;