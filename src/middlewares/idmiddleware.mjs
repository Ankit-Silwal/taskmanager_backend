import todo from "../models/todoschemas.mjs";

export const checkid = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID is required to find a todo",
      });
    }
    const targetTodo = await todo.findById(id);
    if (!targetTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }
    if (targetTodo.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to access this todo",
      });
    }
    req.targetTodo=targetTodo;
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Sorry, an error occurred",
      error: err.message,
    });
  }
};
