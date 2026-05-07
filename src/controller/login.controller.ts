import express from "express";
import User from "../model/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req: express.Request, res: express.Response) => {
    try{
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            status: "fail",
            message: "Email and password are required"
        })
    }
    // find user by email
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({
            status: "fail",
            message: "User not found"
        })
    }

    // verify password
    const passwordMatch = await bcrypt.compare(password,user.password);

    if (!passwordMatch){
        return res.status(400).json({
            status: "fail",
            message: "Invalid credentials"
        })
    }

    // generate JWT token
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ id: user._id }, secret as string, {
        expiresIn: "1h"
    });

    return res.status(200).json({
        status: "success",
        token: token,
        message: "User logged in successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    })}
    catch(error){
        return res.status(500).json({
            status: "error",
            message: "Server error",
            error: error
        })
    }
}