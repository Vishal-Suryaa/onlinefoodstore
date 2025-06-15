import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../constants/http_status";
import { verify } from "jsonwebtoken";

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.access_token as string;
  if (!token) {
    res.status(HTTP_STATUS.UNAUTHORIZED).send("Unauthorized");
    return;
  }
  try {
    const decoded = verify(token as string, process.env.JWT_SECRET as string);
    (req as any).user = decoded;
  } catch (error) {
    res.status(HTTP_STATUS.UNAUTHORIZED).send("Unauthorized");
  }
  return next();
};