const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    task: { type: String, required: true },
    dueStartDate: { type: Date, required: true },
    dueEndDate: { type: Date, required: true },
    isComplete: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
