import Router from "express";
import { editTodo } from "../../controller/todo.controller/todo.edit";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.put("/todos/:id", authMiddleware, editTodo);

export default router;