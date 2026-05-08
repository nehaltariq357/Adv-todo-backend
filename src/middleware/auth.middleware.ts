import express from "express";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
    }
  }
}
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // get token from header // Bearer token // from client
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        status: "fail",
        message: "Authorization header is required",
      });
    }
    // Bearer token split
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid token format",
      });
    }

    // verify token
    const secret = process.env.JWT_SECRET;
    const decodeToken = jwt.verify(token, secret as string);

    if (!decodeToken) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid token",
      });
    }

    // save user to request
    req.user = decodeToken;

    // call next middleware
    next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized",
    });
  }
};
