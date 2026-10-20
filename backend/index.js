require("dotenv/config");

const express = require("express");
const cors = require("cors");

const db = require("./db/db.config");

const mainRouter = require("./src/app/main.route");

const logger = require("./src/middleware/logger");

const loggerSecond = require("./src/middleware/logger-second");

const errorHandler = require("./src/middleware/error-handler");

const app = express();

const PORT = process.env.PORT || 3777;

// ======================================================
// CORS
// ======================================================

const allowedOrigins = (
  process.env.CORS_ORIGINS ||
  [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://bethel-gpt-clone-final-g7ct.vercel.app",
  ].join(",")
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests without an Origin header,
      // such as curl and Postman.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.warn("CORS blocked origin:", origin);
      return callback(null, false);
    },
    credentials: true,
  }),
);

// ======================================================
// GENERAL MIDDLEWARE
// ======================================================

app.disable("x-powered-by");

app.use(express.json({ limit: "1mb" }));

app.use(logger);

app.use(loggerSecond);

// ======================================================
// HOME
// ======================================================

app.get("/", (req, res) => {
  res.send("GPT Clone API is running");
});

// ======================================================
// ABOUT
// ======================================================

app.get("/about", (req, res) => {
  res.send("GPT Clone API - ChatGPT Clone Project");
});

// ======================================================
// DATABASE TEST
// ======================================================

app.get("/db-test", async (req, res, next) => {
  try {
    const [rows] = await db.execute("SELECT 1 AS result");

    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    next(error);
  }
});

// ======================================================
// GEMINI AI TEST
// ======================================================

app.get("/gemini-test", async (req, res, next) => {
  try {
    const { geminiClient, geminiModel } = require("./src/utils/gemini");

    console.log("Gemini model:", geminiModel);

    const response = await geminiClient.models.generateContent({
      model: geminiModel,
      contents: "Say hello in one sentence.",
    });

    const answer =
      typeof response.text === "function" ? response.text() : response.text;

    res.status(200).json({
      success: true,
      model: geminiModel,
      answer,
    });
  } catch (error) {
    console.error("Gemini test failed:", error.message);
    next(error);
  }
});

// ======================================================
// API ROUTES
// ======================================================

app.use("/api", mainRouter);

// ======================================================
// 404 HANDLER
// ======================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ======================================================
// GLOBAL ERROR HANDLER
// ======================================================

app.use(errorHandler);

// ======================================================
// START SERVER
// ======================================================

const startServer = async () => {
  try {
    const connection = await db.getConnection();

    console.log("Database connected successfully");

    connection.release();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);

    process.exit(1);
  }
};

startServer();
