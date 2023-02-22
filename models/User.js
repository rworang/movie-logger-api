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
    img: {
      type: String,
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
      default: [
        {
          watchList: {
            type: Array,
            default: [
              {
                _id: {
                  type: String,
                  unique: true,
                },
              },
            ],
          },
        },
        {
          moviesList: {
            type: Array,
            default: [
              {
                _id: {
                  type: String,
                  unique: true,
                },
              },
            ],
          },
        },
        {
          showsList: {
            type: Array,
            default: [
              {
                _id: {
                  type: String,
                  unique: true,
                },
              },
            ],
          },
        },
        {
          animeList: {
            type: Array,
            default: [
              {
                _id: {
                  type: String,
                  unique: true,
                },
              },
            ],
          },
        },
      ],
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
