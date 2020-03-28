const express = require("express");
const db = require("./config/db");
const path = require("path");
const app = express();

// Connect Database
db.connectDB()
  .then(msg => {
    console.log(msg);
  })
  .catch(err => {
    console.log(err);
  });

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
//app.use("/api/users", require("./routes/api/users"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
