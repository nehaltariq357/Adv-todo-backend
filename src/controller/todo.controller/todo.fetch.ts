import express, { Request, Response } from "express";
import Todo from "../../model/todo.model";

export const fetchTodo = async (req: Request, res: Response) => {
const page = parseInt(req.query.page as string) || 1;
const limit = parseInt(req.query.limit as string) || 10;

const skip = (page - 1) * limit;
  try {
    const {search} = req.query
    // current logged in user
    let filter: any = {
      user: (req.user as any).userId,
    };

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }
const total = await Todo.countDocuments(filter);

    const todos = await Todo.find(filter).skip(skip).limit(limit).sort({createdAt:-1});
    return res.status(200).json({
      status: "success",
      message: "todos fetched",
      data: todos,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
    
  } catch (error) {
    console.log("todo fetch error", error);
    return res.status(500).json({
      status: "fail",
      message: "Server error",
      error,
    });
  }
};
