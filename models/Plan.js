const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const planSchema = new Schema(
  {
    username: String,
    gender: { type: String, default: "Null" },
    allergies: { type: String, default: "Null" },
    diet: { type: String, default: "Null" },
    age: Number,
    calories: Number,
    breakfast: String,
    Snack: String,
    Lunch: String,
    Dinner: String
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Plan = mongoose.model("Plan", planSchema);
module.exports = Plan;
