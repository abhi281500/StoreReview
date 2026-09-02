import bcrypt from "bcryptjs";

import { User, Store, Rating } from "../models/index.js";

// ======================================
// OWNER DASHBOARD
// ======================================

export const getOwnerDashboard = async (req, res) => {
  try {
    // Find store owned by logged-in owner
    const store = await Store.findOne({
      where: {
        ownerId: req.user.id,
      },
      include: [
        {
          model: Rating,
          as: "ratings",
          attributes: ["rating"],
        },
      ],
    });

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "No store found for this owner",
      });
    }

    const ratings = store.ratings || [];

    const averageRating =
      ratings.length > 0
        ? ratings.reduce(
            (sum, item) => sum + item.rating,
            0
          ) / ratings.length
        : 0;

    return res.status(200).json({
      success: true,
      data: {
        store: {
          id: store.id,
          name: store.name,
          email: store.email,
          address: store.address,
        },
        totalRatings: ratings.length,
        averageRating: Number(
          averageRating.toFixed(2)
        ),
      },
    });
  } catch (error) {
    console.error("Owner dashboard error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch owner dashboard",
    });
  }
};

// ======================================
// USERS WHO RATED OWNER'S STORE
// ======================================

export const getOwnerRatings = async (req, res) => {
  try {
    const store = await Store.findOne({
      where: {
        ownerId: req.user.id,
      },
    });

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "No store found for this owner",
      });
    }

    const ratings = await Rating.findAll({
      where: {
        storeId: store.id,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: [
            "id",
            "name",
            "email",
            "address",
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    const formattedRatings = ratings.map(
      (item) => ({
        ratingId: item.id,
        rating: item.rating,
        submittedAt: item.createdAt,
        user: {
          id: item.user.id,
          name: item.user.name,
          email: item.user.email,
          address: item.user.address,
        },
      })
    );

    return res.status(200).json({
      success: true,
      count: formattedRatings.length,
      data: formattedRatings,
    });
  } catch (error) {
    console.error("Owner ratings error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch ratings",
    });
  }
};

// ======================================
// UPDATE OWNER PASSWORD
// ======================================

export const updateOwnerPassword = async (req, res) => {
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
    console.error("Owner password error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update password",
    });
  }
};