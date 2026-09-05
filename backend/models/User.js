import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define(
  "User",
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
          msg: "Name is required",
        },
        len: {
          args: [1, 100],
          msg: "Name must be between 1 and 100 characters",
        },
      },
    },

    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Please provide a valid email",
        },
        notEmpty: {
          msg: "Email is required",
        },
      },
    },

    password: {
  type: DataTypes.STRING(255),
  allowNull: false,
  validate: {
    notEmpty: {
      msg: "Password is required",
    },
  },
},

    address: {
      type: DataTypes.STRING(400),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Address is required",
        },
        len: {
          args: [1, 400],
          msg: "Address cannot exceed 400 characters",
        },
      },
    },

    role: {
      type: DataTypes.ENUM("ADMIN", "USER", "STORE_OWNER"),
      allowNull: false,
      defaultValue: "USER",
    },
  },
  {
    tableName: "users",
    timestamps: true,

    indexes: [
      {
        unique: true,
        fields: ["email"],
      },
      {
        fields: ["name"],
      },
      {
        fields: ["role"],
      },
    ],
  }
);

export default User;