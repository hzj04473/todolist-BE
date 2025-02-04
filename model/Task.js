const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    task: { type: String, required: true },
    dueStartDate: { type: Date, required: true },
    dueEndDate: { type: Date, required: true },
    geminiMessage: {
      type: String,
      required: true,
    },
    author: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
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
