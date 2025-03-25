const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const app = express();

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("[Connected Successfully]"))
  .catch(() => console.log("[Failed to Connect]"));

const schema = new mongoose.Schema({}, { timestamps: true });
const modal = mongoose.model("comments", schema, "comments");

app.get("/test", async (req, res) => {
  let data = await modal.find({}).limit(10);
  console.log(data);
  return res.send("ok");
});

app.listen(3000, () => console.log("Running on port 3000"));
