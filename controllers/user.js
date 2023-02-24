import { createError } from "../error.js";
import User from "../models/User.js";

export const update = async (req, res, next) => {
  if (req.params.id === req.user.id || req.user.isAdmin) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can only update your own account"));
  }
};
export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can only delete your own account"));
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).lean();

    const { name, email, avatar, coverImg, followers, following, isAdmin } =
      user;
    const profile = {
      name,
      email,
      avatar,
      coverImg,
      followers,
      following,
      isAdmin,
    };

    const { lists, reviews, ratings, files } = user;
    const resFormatted = { profile, lists, reviews, ratings, files };

    res.status(200).json(resFormatted);
  } catch (err) {
    next(err);
  }
};
export const follow = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { followers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $addToSet: { following: req.user.id },
    });
    res.status(200).json("Successfully followed");
  } catch (err) {
    next(err);
  }
};
export const unfollow = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { followers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $pull: { following: req.user.id },
    });
    res.status(200).json("Successfully unfollowed");
  } catch (err) {
    next(err);
  }
};
