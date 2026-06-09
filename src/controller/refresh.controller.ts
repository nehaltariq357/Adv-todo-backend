import jwt from "jsonwebtoken"
import { Request, Response } from "express"
import User from "../model/user.model"
import generateAccessToken from "../utils/jwt"
import dotenv from "dotenv"

dotenv.config()

const refreshToken = async(req: Request, res: Response) => {
    try{
        const refreshToken = req.cookies.refreshToken
        const secret = process.env.REFRESH_TOKEN_SECRET as string

        if(!refreshToken) return res.status(401).json({message: "no refresh token provided"})
        
        // verify refresh token and get user id from refresh token
        const decoded = jwt.verify(refreshToken,secret)
        // find user by id from decoded refresh token
        const user = await User.findById(decoded.id)
        if(!user) return res.status(404).json({message: "User not found"})

        // generate new access token
        const newaccessToken = generateAccessToken(user._id)
        
        // set new access token in cookie
        res.cookie("accessToken",newaccessToken,{
            httpOnly: true,
            secure:false,
            sameSite:"lax"
        })

        // send new access token in response
        res.status(200).json({message:"access token refreshed",accessToken: newaccessToken})

    }catch(err){
        console.log(err)
        res.status(500).json({message: "Invalid refresh token"})
    }
}

export default refreshToken