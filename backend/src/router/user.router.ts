import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import express from "express";
import { UserModel } from "../models/user.model";
import asyncHandler from "express-async-handler";
import { HTTP_STATUS } from "../constants/http_status";
import bcrypt from "bcryptjs";

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

router.post("/register", asyncHandler(async (req: express.Request, res: express.Response) => {
  const { name, email, password, address } = req.body;

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    res.status(HTTP_STATUS.BAD_REQUEST).send("User already exists, please login!");
    return;
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const user = await UserModel.create({
    name,
    email: email.toLowerCase(),
    password: encryptedPassword,
    address,
    isAdmin: false
  });

  res.status(HTTP_STATUS.CREATED).send(generateTokenResponse(user));
}));

router.post("/login", asyncHandler(async (req: express.Request, res: express.Response) => {
  const { email, password } = req?.body;
  const user = await UserModel.findOne({ email, password });
  if (user) {
    res.send(generateTokenResponse(user));
  } else {
    res.status(HTTP_STATUS.BAD_REQUEST).send("User not found");
  }
}));

function generateTokenResponse(user: any) {
  const token = jwt.sign({ email: user.email, isAdmin: user.isAdmin }, "someRandomKey", { expiresIn: "30d" });
  user.token = token;
  return user;
}

export default router;