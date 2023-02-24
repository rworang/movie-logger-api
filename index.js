import express from "express";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import searchRoutes from "./routes/search.js";

const app = express();
const env = dotenv.config();
dotenvExpand.expand(env);

const connect = () => {
  mongoose
    .set("strictQuery", false)
    .connect(process.env.MONGO)
    .then(() =>
      console.log(`Using Database: \x1b[36m${process.env.DB_NAME}\x1b[0m`)
    )
    .catch((err) => {
      throw err;
    });
};

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      sameSite: true,
      secure: process.env.NODE_ENV === "production",
    },
  })
);
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/search", searchRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    succes: false,
    status,
    message,
  });
});

app.listen(process.env.PORT, () => {
  connect();
  console.log(`Server is running on port: \x1b[36m${process.env.PORT}\x1b[0m`);
});
