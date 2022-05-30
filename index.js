import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
dotenv.config();

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());

const userSchema = new mongoose.Schema({
  question: String,
  optionA: String,
  optionB: String,
  optionC: String,
  optionD: String,
  answer: String,
});

const User = mongoose.model("Question", userSchema, "Questions");

// Hauptseite
app.use(express.json());
app.get("/play/quiz", async (req, res) => {
  let questions = [];
  if (req.query.minage) {
    questions = await User.find({ age: { $gt: req.query.minage } }).exec();
  } else {
    questions = await User.find().exec();
  }
  return res.json(questions);
});

// Löschen des users
app.delete("/question/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    await Question.deleteOne({ id: req.params.id });
    res.send("wurde gelöscht!!!");
  } catch {
    res.status(500).send({ massage: "löschen Fehlgeschlagen!!" });
  }
});

mongoose.connect(process.env.MONGO_CONNECTION).then(() => {
  app.listen(port, () => {
    console.log(`users API listening on ${port}`);
  });
});
