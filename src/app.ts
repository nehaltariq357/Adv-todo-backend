import express from "express";
import healthRoute from "./routes/api.health.route"

const app = express();
app.use(express.json());

app.use("/api",healthRoute)
export default app;