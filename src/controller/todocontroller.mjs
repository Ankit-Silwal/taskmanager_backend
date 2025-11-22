import mongoose from "mongoose";
import todo from "../models/todoschemas.mjs";
export const create = async (req, res) => {
  try {
    const { title, description, emergency } = req.body;
    if (!title) {
      return res.json({
        success: false,
        message: "Please enter the title ",
      });
    }
    const titleExist = await todo.findOne({ title });
    if (titleExist) {
      return res.json({
        success: false,
        message:
          "The same title exists already you may update the description thoo",
      });
    }
    const newTodo = todo.create({
      title,
      description,
      completed:false,
      emergency,
      user: req.user._id,
    });
    return res.json({
      success: true,
      todo: {
        title: newTodo.title,
        description: newTodo.description,
        completed: newTodo.description,
        emergency: newTodo.emergency,
        user: req.user._id,
        createdAt: newTodo.createdAt,
      },
    });
  } catch (err) {
    return res.json({
      success: false,
      msg: "You encountered an error",
      err: err.message,
    });
  }
};

export const read = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      targetTodo: req.targetTodo,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Sorry an error occured",
      error: err.message,
    });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    await req.targetTodo.deleteOne();
    res.status(200).json({
      success: true,
      msg: "The Todo was sucessfully deleted from the database",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Sorry an error occured",
      error: err.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const targetTodo = req.targetTodo; 

    if (title) targetTodo.title = title;
    if (description) targetTodo.description = description;
    if (completed !== undefined) targetTodo.completed = completed;

    await targetTodo.save();

    return res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      todo: targetTodo,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Sorry an error occured",
      error: err.message,
    });
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const paramUserId = req.params?.userId;
    const userId = paramUserId ?? req.user?._id;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User id is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(String(userId))) {
      return res.status(400).json({ success: false, message: "Invalid user id format" });
    }

    const todos = await todo.find({ user: userId }).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: todos.length,
      todos,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Unable to fetch todos",
      error: err.message,
    });
  }
};
