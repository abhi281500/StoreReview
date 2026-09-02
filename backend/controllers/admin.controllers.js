import bcrypt from "bcryptjs";
import { Op } from "sequelize";

import { User, Store, Rating } from "../models/index.js";

// ======================================
// ADMIN DASHBOARD
// ======================================

export const getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.count();

    const totalStores = await Store.count();

    const totalRatings = await Rating.count();

    return res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalStores,
        totalRatings,
      },
    });
  } catch (error) {
    console.error("Dashboard error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard",
    });
  }
};

// ======================================
// CREATE NORMAL USER
// ======================================

export const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      address,
    } = req.body;

    if (!name || !email || !password || !address) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>_\-+=]).{8,16}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be 8-16 characters and contain one uppercase letter and one special character",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role: "USER",
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Create user error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create user",
    });
  }
};

// ======================================
// CREATE ADMIN
// ======================================

export const createAdmin = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      address,
    } = req.body;

    if (!name || !email || !password || !address) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>_\-+=]).{8,16}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be 8-16 characters and contain one uppercase letter and one special character",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role: "ADMIN",
    });

    return res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        address: admin.address,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Create admin error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create admin",
    });
  }
};

// ======================================
// CREATE STORE
// ======================================

export const createStore = async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      ownerId,
    } = req.body;

    if (!name || !email || !address || !ownerId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const owner = await User.findByPk(ownerId);

    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Store owner not found",
      });
    }

    if (owner.role !== "STORE_OWNER") {
      return res.status(400).json({
        success: false,
        message: "Selected user is not a store owner",
      });
    }

    const store = await Store.create({
      name,
      email,
      address,
      ownerId,
    });

    return res.status(201).json({
      success: true,
      message: "Store created successfully",
      data: store,
    });
  } catch (error) {
    console.error("Create store error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create store",
    });
  }
};

// ======================================
// GET USERS
// ======================================

export const getUsers = async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      role,
      sortBy = "name",
      order = "ASC",
    } = req.query;

    const where = {};

    if (name) {
      where.name = {
        [Op.like]: `%${name}%`,
      };
    }

    if (email) {
      where.email = {
        [Op.like]: `%${email}%`,
      };
    }

    if (address) {
      where.address = {
        [Op.like]: `%${address}%`,
      };
    }

    if (role) {
      where.role = role;
    }

    const allowedSortFields = [
      "id",
      "name",
      "email",
      "address",
      "role",
      "createdAt",
    ];

    const safeSortBy = allowedSortFields.includes(sortBy)
      ? sortBy
      : "name";

    const safeOrder =
      order.toUpperCase() === "DESC"
        ? "DESC"
        : "ASC";

    const users = await User.findAll({
      where,
      attributes: [
        "id",
        "name",
        "email",
        "address",
        "role",
        "createdAt",
      ],
      order: [[safeSortBy, safeOrder]],
    });

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error("Get users error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

// ======================================
// GET USER DETAILS
// ======================================

export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: [
        "id",
        "name",
        "email",
        "address",
        "role",
        "createdAt",
      ],
      include: [
        {
          model: Store,
          as: "ownedStores",
          attributes: [
            "id",
            "name",
            "email",
            "address",
          ],
          include: [
            {
              model: Rating,
              as: "ratings",
              attributes: ["rating"],
            },
          ],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Get user details error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch user details",
    });
  }
};

// ======================================
// GET STORES
// ======================================

export const getStores = async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      sortBy = "name",
      order = "ASC",
    } = req.query;

    const where = {};

    if (name) {
      where.name = {
        [Op.like]: `%${name}%`,
      };
    }

    if (email) {
      where.email = {
        [Op.like]: `%${email}%`,
      };
    }

    if (address) {
      where.address = {
        [Op.like]: `%${address}%`,
      };
    }

    const allowedSortFields = [
      "id",
      "name",
      "email",
      "address",
      "createdAt",
    ];

    const safeSortBy = allowedSortFields.includes(sortBy)
      ? sortBy
      : "name";

    const safeOrder =
      order.toUpperCase() === "DESC"
        ? "DESC"
        : "ASC";

    const stores = await Store.findAll({
      where,
      include: [
        {
          model: Rating,
          as: "ratings",
          attributes: ["rating"],
        },
      ],
      order: [[safeSortBy, safeOrder]],
    });

    const formattedStores = stores.map((store) => {
      const ratings = store.ratings || [];

      const averageRating =
        ratings.length > 0
          ? ratings.reduce(
              (sum, item) => sum + item.rating,
              0
            ) / ratings.length
          : 0;

      return {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        rating: Number(averageRating.toFixed(2)),
      };
    });

    return res.status(200).json({
      success: true,
      count: formattedStores.length,
      data: formattedStores,
    });
  } catch (error) {
    console.error("Get stores error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch stores",
    });
  }
};


// ======================================
// CREATE STORE OWNER
// ======================================

export const createStoreOwner = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      address,
    } = req.body;

    if (!name || !email || !password || !address) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>_\-+=]).{8,16}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be 8-16 characters and contain one uppercase letter and one special character",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const owner = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role: "STORE_OWNER",
    });

    return res.status(201).json({
      success: true,
      message: "Store owner created successfully",
      data: {
        id: owner.id,
        name: owner.name,
        email: owner.email,
        address: owner.address,
        role: owner.role,
      },
    });
  } catch (error) {
    console.error("Create store owner error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create store owner",
    });
  }
};