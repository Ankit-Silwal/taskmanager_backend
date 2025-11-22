import todo from "../models/todoschemas.mjs";
export const create = async (req, res) => {
  try {
    const { title, description, completed, emergency } = req.body;
    if (!title) {
      return res.json({
        success: false,
        message: "Please enter the title and description for sure",
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
      completed,
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
    return res.status(200).json({
      success: true,
      targetTodo,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Sorry an error occured",
      error: err.message,
    });
  }
};


