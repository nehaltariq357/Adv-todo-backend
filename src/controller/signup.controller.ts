import { Request, Response } from "express"
import User from "../model/user.model"

export const signup = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                status: "fail",
                message: "All fields are required"
            })
        }

        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(400).json({
                status: "fail",
                message: "User already exists"
            })
        
        }

        const user = await User.create({
            name,
            email,
            password
        
        })

        return res.status(201).json({
            status: "success",
            message: "User created successfully",
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "error",
            message: "Server error"
        })
    }
}