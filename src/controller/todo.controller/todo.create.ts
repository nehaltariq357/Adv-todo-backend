
import express, { Request, Response } from "express"
import Todo from  "../../model/todo.model"

export const createTodo = async (req: Request, res: Response) => {
    try{

        const {title,completed} =req.body

        if (!title){
            return res.status(400).json({
                status:"fail",
                message:"title is required"
            })
        }

        // create todo
        const todo = await Todo.create({
            title,
            completed,
            user: (req.user as any).userId
        
        })

        // response
        return res.status(201).json({
            status:"success",
            message:"todo created",
            data:todo
        })

    }catch(err){
        console.log("todo create error",err)
        return res.status(500).json({
            status:"fail",
            message:"server error"
        })
    

    }

}