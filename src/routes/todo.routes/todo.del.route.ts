import Router from "express";
import { TodoDel } from "../../controller/todo.controller/todo.del";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.delete("/todos/:id", authMiddleware, TodoDel);

export default router;