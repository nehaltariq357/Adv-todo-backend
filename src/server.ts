import app from "./app"
import connectDB from "./config/db"
import dotenv from "dotenv"

dotenv.config()

const port = process.env.PORT

connectDB().then(() => {
    app.listen(port, () => {
        console.log("mongoDB connected")
        console.log(`server is running on http://localhost:${port}`)
    })
})