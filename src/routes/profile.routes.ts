import Router from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { profile } from "../controller/profile.controller";

const router = Router();

router.get("/profile", authMiddleware, profile);
export default router;
