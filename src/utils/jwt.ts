import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string

if (!accessTokenSecret || !refreshTokenSecret) {
  throw new Error("JWT secrets are not defined in the environment variables.")
}

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ id:userId }, accessTokenSecret, { expiresIn: "15m" ,algorithm:"HS256"})
}


export const generateRefreshToken = (userId: string) => {
    return jwt.sign(
        {id:userId},
        refreshTokenSecret,
        { expiresIn: "7d" ,algorithm:"HS256"}
    )
}

// this function will verify the access token and return the decoded payload if valid, otherwise it will throw an error
