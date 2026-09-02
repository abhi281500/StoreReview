import bcrypt from "bcryptjs";
import { Op } from "sequelize";

import { User, Store, Rating } from "../models/index.js";

// ======================================
// GET ALL STORES
// ======================================

export const getStores = async (req, res) => {
  try {
    const {
      name,
      address,
      sortBy = "name",
      order = "ASC",
    } = req.query;

    const where = {};

    // Search by store name
    if (name) {
      where.name = {
        [Op.like]: `%${name}%`,
      };
    }

    // Search by store address
    if (address) {
      where.address = {
        [Op.like]: `%${address}%`,
      };
    }

    // Allowed sorting fields
    const allowedSortFields = [
      "id",
      "name",
      "address",
      "email",
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
          attributes: ["userId", "rating"],
        },
      ],

      order: [[safeSortBy, safeOrder]],
    });

    const formattedStores = stores.map((store) => {
      const ratings = store.ratings || [];

      // Overall average rating
      const averageRating =
        ratings.length > 0
          ? ratings.reduce(
              (sum, item) => sum + item.rating,
              0
            ) / ratings.length
          : 0;

      // Current user's rating
      const userRating = ratings.find(
        (item) => item.userId === req.user.id
      );

      return {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        overallRating: Number(
          averageRating.toFixed(2)
        ),
        userSubmittedRating: userRating
          ? userRating.rating
          : null,
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
// SUBMIT RATING
// ======================================

export const submitRating = async (req, res) => {
  try {
    const { storeId, rating } = req.body;

    if (!storeId || rating === undefined) {
      return res.status(400).json({
        success: false,
        message: "storeId and rating are required",
      });
    }

    // Validate rating
    if (
      !Number.isInteger(Number(rating)) ||
      Number(rating) < 1 ||
      Number(rating) > 5
    ) {
      return res.status(400).json({
        success: false,
        message: "Rating must be an integer between 1 and 5",
      });
    }

    // Check store
    const store = await Store.findByPk(storeId);

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found",
      });
    }

    // Check if user already rated this store
    const existingRating = await Rating.findOne({
      where: {
        userId: req.user.id,
        storeId,
      },
    });

    if (existingRating) {
      return res.status(409).json({
        success: false,
        message:
          "You have already rated this store. You can modify your rating instead.",
      });
    }

    const newRating = await Rating.create({
      userId: req.user.id,
      storeId,
      rating: Number(rating),
    });

    return res.status(201).json({
      success: true,
      message: "Rating submitted successfully",
      data: newRating,
    });
  } catch (error) {
    console.error("Submit rating error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit rating",
    });
  }
};

// ======================================
// MODIFY RATING
// ======================================

export const updateRating = async (req, res) => {
  try {
    const { storeId } = req.params;
    const { rating } = req.body;

    if (rating === undefined) {
      return res.status(400).json({
        success: false,
        message: "Rating is required",
      });
    }

    // Validate rating
    if (
      !Number.isInteger(Number(rating)) ||
      Number(rating) < 1 ||
      Number(rating) > 5
    ) {
      return res.status(400).json({
        success: false,
        message: "Rating must be an integer between 1 and 5",
      });
    }

    const existingRating = await Rating.findOne({
      where: {
        userId: req.user.id,
        storeId,
      },
    });

    if (!existingRating) {
      return res.status(404).json({
        success: false,
        message: "You have not rated this store yet",
      });
    }

    existingRating.rating = Number(rating);

    await existingRating.save();

    return res.status(200).json({
      success: true,
      message: "Rating updated successfully",
      data: existingRating,
    });
  } catch (error) {
    console.error("Update rating error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update rating",
    });
  }
};

// ======================================
// UPDATE PASSWORD
// ======================================

export const updatePassword = async (req, res) => {
  try {
    const {
      currentPassword,
      newPassword,
    } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Current password and new password are required",
      });
    }

    // Check current password
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      req.user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Validate new password
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>_\-+=]).{8,16}$/;

    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be 8-16 characters and contain one uppercase letter and one special character",
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    req.user.password = hashedPassword;

    await req.user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Update password error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update password",
    });
  }
};