import express from "express";
import health from "./routes/api.health.route"
import signup from "./routes/signup.routes"
import login from "./routes/login.routes"
import profile from "./routes/profile.routes"
import createTodo from "./routes/todo.routes/todo.create.route"
import fetchTodo from "./routes/todo.routes/todo.fetch.route"
import editTodo from "./routes/todo.routes/todo.edit.route"
import delTodo from "./routes/todo.routes/todo.del.route"
import refreshRoute from "./routes/refresh.route"
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true, // it allows the browser to send cookies along with the requests
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());
// auth routes
app.use("/api",signup)
app.use("/api",login)
app.use("/api",profile)
app.use("/api",health)

// refresh token route

app.use("/api",refreshRoute)

// todo routes
app.use("/api",createTodo)
app.use("/api",fetchTodo)
app.use("/api",editTodo)
app.use("/api",delTodo)
export default app;