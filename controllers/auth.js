import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    res.status(200).send("User has been created");
  } catch (err) {
    next(err);
  }
};

// Generate a new access token
const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT, {
    expiresIn: "5m",
  });
};

// Generate a new refresh token
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_REFRESH
  );
};

export const login = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    req.session.accessToken = accessToken;
    req.session.refreshToken = refreshToken;

    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      access_token: accessToken,
      refresh_token: refreshToken,
    });
    // const user = await User.findOne({ name: req.body.name });
    // if (!user) return next(createError(404, "User not found"));

    // const isCorrect = await bcrypt.compare(req.body.password, user.password);

    // if (!isCorrect) return next(createError(400, "Wrong credentials"));

    // const accessToken = generateAccessToken(user);
    // const refreshToken = generateRefreshToken(user);

    // res
    //   .cookie("access_token", accessToken, {
    //     httpOnly: true,
    //   })
    //   .cookie("refresh_token", refreshToken, {
    //     httpOnly: true,
    //   })
    //   .status(200)
    //   .json({
    //     user: {
    //       _id: user._id,
    //       name: user.name,
    //       email: user.email,
    //       isAdmin: user.isAdmin,
    //     },
    //     access_token: accessToken,
    //     refresh_token: refreshToken,
    //   });
  } catch (err) {
    next(err);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._doc);
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (err) {
    next(err);
  }
};
