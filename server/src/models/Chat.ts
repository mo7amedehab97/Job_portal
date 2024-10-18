import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import User from "./User";

class Chat extends Model {
  public id!: number;
  public senderId!: number; // Foreign key for Users
  public receiverId!: number; // Foreign key for Users
  public message!: string;
  public timestamp!: Date;
}

Chat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    senderId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    receiverId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "chats",
  }
);

export default Chat;
