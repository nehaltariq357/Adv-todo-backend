import express from "express";
import health from "./routes/api.health.route"
import signup from "./routes/signup.routes"
import login from "./routes/login.routes"
import profile from "./routes/profile.routes"


const app = express();
app.use(express.json());

app.use("/api",signup)
app.use("/api",login)
app.use("/api",profile)
app.use("/api",health)
export default app;