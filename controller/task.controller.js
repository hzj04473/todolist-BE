const Task = require('../model/Task');

const taskController = {};

taskController.createTask = async (req, res) => {
  try {
    const { task, dueStartDate, dueEndDate, isComplete } = req.body;

    const newTask = new Task({ task, dueStartDate, dueEndDate, isComplete });

    await newTask.save();

    res.status(201).json({ status: 'ok', data: newTask });
  } catch (err) {
    res.status(400).json({ status: 'fail', error: err });
  }
};

taskController.getTask = async (req, res) => {
  try {
    const taskList = await Task.find({}).select('-__v ');
    res.status(200).json({ status: 'ok', data: taskList });
  } catch (err) {
    res.status(400).json({ status: 'fail', error: err });
  }
};

taskController.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    // .find({ year: { $gte: 1980, $lte: 1989 } });
    // .where({ color: 'white' });
    const taskListIsComplete = await Task.findOne({ _id: id }).select(
      '-__v -_id -task -createdAt -updatedAt'
    );
    // console.log(!taskListIsComplete.isComplete);
    // const updatedTask = await Task.findOneAndUpdate(
    //   { _id: id },
    //   { isComplete: !taskListIsComplete.isComplete },
    //   { new: true }
    // );
    const updatedTask = await Task.updateOne(
      { _id: id },
      { $set: { isComplete: !taskListIsComplete.isComplete } }
    );

    res.status(200).json({ status: 'ok', data: updatedTask });
  } catch (err) {
    res.status(400).json({ status: 'fail', error: err });
  }
};

taskController.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const deleteTask = await Task.deleteOne({ _id: id });

    res.status(200).json({ status: 'ok', message: deleteTask });
  } catch (err) {
    res.status(400).json({ status: 'fail', error: err });
  }
};

module.exports = taskController;
