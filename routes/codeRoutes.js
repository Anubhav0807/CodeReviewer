const express = require("express");
const dotenv = require("dotenv");
const Code = require("../models/code"); // Import Code model
const router = express.Router();

dotenv.config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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

router.post("/prompt_ai", async (req, res) => {
  try {
    const { title, content, language, prompt } = req.body;
    const response = (
      await model.generateContent(
        `Filename: ${title}\n Language: ${language}\n${content}\n\n${prompt}`
      )
    ).response;
    console.log('respone came');
    console.log(response.text());
    res.status(200).json({ message: "Prompt sent successfully!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
