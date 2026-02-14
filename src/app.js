const express = require("express");
const pool = require("./config/db");

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/db-check", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ db_time: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "DB connection failed" });
  }
});

module.exports = app;
