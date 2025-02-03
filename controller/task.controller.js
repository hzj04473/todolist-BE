const Task = require('../model/Task');
// 제미니 연결
const { GoogleGenerativeAI } = require('@google/generative-ai');

const taskController = {};

taskController.createTask = async (req, res) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  try {
    const { task, dueStartDate, dueEndDate, isComplete } = req.body;

    const prompt = `할 일 "${task}"에 대한 긍정적이고, 동기 부여가 되는 짧은 문구를 문어체 부탁해요. 글자수는 최소 15자에서 최대 20자로 꼭 신경 써 주세요. 이상한 특수문자등은 필요없어요. 문구 제일 앞에 관련된 이모티콘을 붙여주세요.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const geminiMessage = response.text();

    const newTask = new Task({
      task,
      dueStartDate,
      dueEndDate,
      geminiMessage,
      isComplete,
    });

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
