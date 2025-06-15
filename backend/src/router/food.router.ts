import { sample_foods } from "../data";
import express from "express";
import { FoodModel } from "../models/food.model";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.get("/seed", asyncHandler(
  async (req: express.Request, res: express.Response) => {
  const foodsCount = await FoodModel.countDocuments();
  if (foodsCount > 0) {
    res.send("Seed is already done!");
    return;
  }
  await FoodModel.insertMany(sample_foods);
  res.send({ message: "Seed is done!" });
}));

router.get("/", asyncHandler(async (req: express.Request, res: express.Response) => {
  const foods = await FoodModel.find();
  res.send(foods);
}));

router.get("/search/:searchTerm", asyncHandler(async (req: express.Request, res: express.Response) => {
  const searchRegex = new RegExp(req.params.searchTerm, "i");
  const foods = await FoodModel.find({ name: { $regex: searchRegex } });
  res.send(foods);
}));

router.get("/tags", asyncHandler(async (req: express.Request, res: express.Response) => {
  const tags = await FoodModel.aggregate([
    { $unwind: "$tags" },
    { $group: { _id: "$tags", count: { $sum: 1 } } },
    { $project: { _id: 0, name: "$_id", count: "$count" } }
  ]).sort({ count: -1 });
  const allTags = { name: "All", count: await FoodModel.countDocuments() };
  tags.unshift(allTags);
  res.send(tags);
}));

router.get("/tags/:tag", asyncHandler(async (req: express.Request, res: express.Response) => {
  const foods = await FoodModel.find({ tags: req.params.tag });
  res.send(foods);
}));

router.get("/:id", asyncHandler(async (req: express.Request, res: express.Response) => {
  const food = await FoodModel.findById(req.params.id);
  res.send(food);
}));

export default router;
