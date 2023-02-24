import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    coverImg: {
      type: String,
      default: "",
    },
    lists: {
      type: Array,
      default: [],
    },
    reviews: {
      type: Array,
      default: [],
    },
    ratings: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [String],
    },
    following: {
      type: Array,
      default: [String],
    },
    files: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
