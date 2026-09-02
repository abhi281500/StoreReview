import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Store = sequelize.define(
  "Store",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Store name is required",
        },
        len: {
          args: [20, 60],
          msg: "Store name must be between 20 and 60 characters",
        },
      },
    },

    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Please provide a valid store email",
        },
        notEmpty: {
          msg: "Store email is required",
        },
      },
    },

    address: {
      type: DataTypes.STRING(400),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Store address is required",
        },
        len: {
          args: [1, 400],
          msg: "Address cannot exceed 400 characters",
        },
      },
    },

    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
  },
  {
    tableName: "stores",
    timestamps: true,

    indexes: [
      {
        fields: ["name"],
      },
      {
        fields: ["email"],
      },
      {
        fields: ["address"],
      },
      {
        fields: ["ownerId"],
      },
    ],
  }
);

export default Store;