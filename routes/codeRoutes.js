const express = require("express");
const Code = require("../models/code"); // Import Code model
const router = express.Router();

// ✅ Get all saved codes
router.get("/", async (req, res) => {
  try {
    const codes = await Code.find();
    res.json(codes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Save new code
router.post("/", async (req, res) => {
  try {
    const { title, content, language } = req.body;
    const newCode = new Code({ title, content, language });
    await newCode.save();
    res.status(201).json({ message: "Code saved successfully!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
