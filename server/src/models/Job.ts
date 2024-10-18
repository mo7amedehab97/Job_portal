import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import User from "./User";

class Job extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public userId!: number; // Foreign key for Users
}

Job.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "jobs",
  }
);

export default Job;
