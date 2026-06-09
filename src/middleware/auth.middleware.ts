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
    const authHeader =  req.headers.authorization;
    const cookiesToken = req.cookies.accessToken;
    console.log("authHeader",authHeader)
    console.log("cookiesToken",cookiesToken)

    let token: string | undefined;

    // cookies token check
    if (cookiesToken) {
      token = cookiesToken;
    }

    // authorization header check
    if (authHeader) {
      token = authHeader.split(" ")[1];
    }

    console.log("token", token);




    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized",
      });
    }



    // verify token
    const secret = process.env.ACCESS_TOKEN_SECRET;
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
