import express from "express";
import User from "../model/user.model";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { generateRefreshToken, generateAccessToken } from "../utils/jwt";

dotenv.config();

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: "fail",
                message: "Email and password are required"
            })
        }
        // find user by email
        const users = await User.findOne({ email });

        if (!users) {
            return res.status(400).json({
                status: "fail",
                message: "User not found"
            })
        }

        // verify password
        const passwordMatch = await bcrypt.compare(password, users.password);

        if (!passwordMatch) {
            return res.status(400).json({
                status: "fail",
                message: "Invalid credentials"
            })
        }

        // generate JWT token

        const accessToken = generateAccessToken(users._id.toString());
        const refreshToken = generateRefreshToken(users._id.toString());

        // cookies set
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 15 * 60 * 1000 // 15 minutes
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        // hide password from response
        const userObj = users.toObject();

        delete (userObj as any).password;
        return res.status(200).json({
            status: "success",
            message: "User logged in successfully",
            user: userObj,
           
        })
    }

    catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Server error",
            error: error
        })
    }
}