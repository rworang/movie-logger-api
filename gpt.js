const express = require("express");
const session = require("express-session");
const User = require("./models/User");

const app = express();

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

app.post("/login", async (req, res) => {
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
});

app.get("/protected-route", (req, res) => {
  if (!req.session.accessToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Verify the access token and grant access to the protected route
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
