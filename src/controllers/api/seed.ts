import express from "express";
import seedDatabase from "~/seeds/seed";

const seedApi = express.Router();

// GET all locations using model.findAll()
seedApi.get("/", (req, res) => {
  try {
    res.json("Seed data created");
    seedDatabase();
  } catch (err) {
    res.status(500).json(err);
  }
});

export default seedApi;
