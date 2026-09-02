import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import sequelize from "../config/database.js";
import { User } from "../models/index.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await sequelize.authenticate();

    const existingAdmin = await User.findOne({
      where: {
        role: "ADMIN",
      },
    });

    if (existingAdmin) {
      console.log("Admin already exists.");
      process.exit(0);
    }

    const password = "Admin@123";

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name: "System Administrator Account",
      email: "admin@storerate.com",
      password: hashedPassword,
      address: "Bhopal, Madhya Pradesh",
      role: "ADMIN",
    });

    console.log("Admin created successfully!");
    console.log({
      id: admin.id,
      email: admin.email,
      password,
      role: admin.role,
    });

    process.exit(0);
  } catch (error) {
    console.error("Failed to create admin:", error);
    process.exit(1);
  }
};

createAdmin();