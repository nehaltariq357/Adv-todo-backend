import Router from "express";
import { createTodo } from "../../controller/todo.controller/todo.create";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.post("/todos", authMiddleware, createTodo);

export default router