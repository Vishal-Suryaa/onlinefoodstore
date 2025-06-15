import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import express from "express";
import { UserModel } from "../models/user.model";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.get("/seed", asyncHandler(async (req: express.Request, res: express.Response) => {
  const usersCount = await UserModel.countDocuments();
  if (usersCount > 0) {
    res.send("Seed is already done!");
    return;
  }
  await UserModel.insertMany(sample_users);
  res.send({ message: "Seed is done!" });
}));


router.post("/login", asyncHandler(async (req: express.Request, res: express.Response) => {
  const { email, password } = req?.body;
  const user = await UserModel.findOne({ email, password });
  if (user) {
    res.send(generateTokenResponse(user));
  } else {
    res.status(400).send("User not found");
  }
}));

function generateTokenResponse(user: any) {
  const token = jwt.sign({ email: user.email, isAdmin: user.isAdmin }, "someRandomKey", { expiresIn: "30d" });
  user.token = token;
  return user;
}

export default router;