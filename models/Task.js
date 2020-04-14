const { model, Schema } = require("mongoose");

const taskSchema = new Schema({
  body: String,
  completed: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = model("Task", taskSchema);
