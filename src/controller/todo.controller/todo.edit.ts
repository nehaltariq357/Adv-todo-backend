import express, { Request, Response } from "express";
import Todo from "../../model/todo.model";

export const editTodo = async (req: Request, res: Response) => {
  try {
    const { title, completed } = req.body;
    const { id } = req.params;

    const userId = (req.user as any).userId;

    // find todo
    const todo = await Todo.findOne({
      _id: id,
      user: userId,
    });

    if (!todo) {
      return res.status(404).json({
        status: "fail",
        message: "todo not found",
      });
    }

    // update todo
    if (title !== undefined) {
      todo.title = title;
    }
    if (completed !== undefined) {
      todo.completed = completed;
    }

    // save todo
    await todo.save();
    return res.status(200).json({
      status: "success",
      message: "todo updated",
      data: todo,
    });
  } catch (err) {
    console.log("todo edit error", err);
    return res.status(500).json({
      status: "fail",
      message: "server error",
    });
  }
};
