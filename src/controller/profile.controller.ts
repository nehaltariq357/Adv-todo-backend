import express, { Request, Response } from "express";

export const profile = (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "user profile",
    data: req.user,
  });
};
