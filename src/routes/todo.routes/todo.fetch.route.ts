import Router from "express"
import { fetchTodo } from "../../controller/todo.controller/todo.fetch";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.get("/todos", authMiddleware, fetchTodo);

export default router;