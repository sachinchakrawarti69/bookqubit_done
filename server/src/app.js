const express = require("express");
const cors = require("cors");

const healthRouter = require("./routes/health");
const booksRouter = require("./routes/books");

function createApp() {
  const app = express();

  app.use(
    cors({
      origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
      credentials: true,
    }),
  );
  app.use(express.json({ limit: "2mb" }));

  app.get("/", (req, res) => {
    res.json({
      message: "BookQubit API running",
      version: "v1",
    });
  });

  app.use("/api/v1/health", healthRouter);
  app.use("/api/v1/books", booksRouter);

  app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
  });

  return app;
}

module.exports = { createApp };