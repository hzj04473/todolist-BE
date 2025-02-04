const Task = require('../model/Task');
// 제미니 연결
const { GoogleGenerativeAI } = require('@google/generative-ai');

const taskController = {};

taskController.createTask = async (req, res) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  try {
    const { task, dueStartDate, dueEndDate, isComplete } = req.body;

    // 미들웨어... userId
    const { userId } = req;

    // 제미니 AI prompt
    const prompt = `"할 일 ${task}에 대해 긍정적이고 동기 부여가 되는 문어체 문구를 작성해주세요.
    - 글자 수: 15~20자
    - 특수문자 제외
    - 문구 앞에 관련 이모티콘 포함"`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const geminiMessage = response.text();

    const newTask = new Task({
      task,
      dueStartDate,
      dueEndDate,
      geminiMessage,
      isComplete,
      author: userId,
    });

    await newTask.save();

    res.status(201).json({ status: 'ok', data: newTask });
  } catch (err) {
    res.status(400).json({ status: 'fail', error: err });
  }
};

taskController.getTask = async (req, res) => {
  try {
    // 미들웨어... userId
    const { userId } = req;

    console.log('middle ID >>>>', userId);

    // sort((a, b) => a.age - b.age);
    const taskList = await Task.find({ author: userId })
      .populate({
        path: 'author',
      }) // ⬅️ 명확한 `path` 지정
      .sort({ isComplete: 1, dueStartDate: 1 })
      .select('-__v ');

    // `author`가 `null`이 아닌 데이터만 필터링
    // const filteredTaskList = taskList.filter((task) => task.author !== null);
    const filteredTaskList = taskList.filter(
      (task) => task.author && task.author._id
    );

    res.status(200).json({
      status: 'ok',
      data: filteredTaskList,
    });
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
