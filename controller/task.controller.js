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
    const prompt = `"할 일 ${task}에 대해 전문가가 말하는 것처럼 조언을 제공해 주세요.  
    다음 조건을 정확히 따라 주세요:  
    1. 전문적이고 신뢰감 있는 어조 사용.  
    2. 반드시 **10자 이내**로 요약 (예: "꾸준함이 중요").  
    3. 10자를 초과할 경우, 다시 생성하여 10자로 맞춤.  
    7. 유머러스한 표현을 포함.  
    8. 특수문자 (!, ?, ., , 등) 제외.  
    9. 문구 앞에 관련 이모티콘 포함 (예: 🏃‍♂️, 📚 등)."`;

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

    // console.log('middle ID >>>>', userId);

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
