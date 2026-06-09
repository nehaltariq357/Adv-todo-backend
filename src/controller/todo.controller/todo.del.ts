import express, { Request, Response }from "express";
import Todo from "../../model/todo.model";

export const TodoDel = async (req: Request, res: Response) => {
    try{
        const {id} = req.params
        const userId = (req.user as any).userId
        const todo = await Todo.findOneAndDelete({
            _id:id,
            user:userId
        
        })
        if(!todo){
            return res.status(404).json({
                status:"fail",
                message:"todo not found"
            })
        }
        return res.status(200).json({
            status:"success",
            message:"todo deleted"
        })
    }catch(err){
        console.log("todo delete error",err)
        return res.status(500).json({
            status:"fail",
            message:"server error"
        })

    }
};
