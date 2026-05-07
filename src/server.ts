import app from "./app"
import connect from "./config/db"
import dotenv from "dotenv"
dotenv.config()

const port = process.env.PORT
connect().then(() => {
    app.listen(port, () => {
        console.log(`server is running on http://localhost:${port}/api`)
    })
})