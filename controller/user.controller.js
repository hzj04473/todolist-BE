const User = require('../model/User');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const userConroller = {};

userConroller.createUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Error('이미 가입이 된 유저 입니다.');
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    // console.log(hash);

    const newUser = new User({ email, name, password: hash });
    await newUser.save();

    res.status(201).json({ status: 'success' });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

userConroller.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }, ' -createdAt -updatedAt -__v');
    if (user) {
      const isMath = bcrypt.compareSync(password, user.password);
      // console.log(isMath);
      if (isMath) {
        const token = user.generateToken();
        return res.status(200).json({ status: 'success', user, token });
      } else {
        throw new Error(
          '회원정보 틀립니다.\n아이디와 패스워드를 입력해 주세요.'
        );
      }
    } else {
      throw new Error('일치하는 회원정보가 없습니다.');
    }
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

userConroller.getUser = async (req, res) => {
  try {
    const { userId } = req;
    // console.log(userId);
    const user = await User.findById(userId);
    // console.log(user);

    if (!user) {
      throw new Error('유저 정보를 찾을 수 없습니다.');
    }
    res.status(200).json({ status: 'succcess', user });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

userConroller.logout = (req, res) => {
  try {
    res.status(200).json({ status: 'success' });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

module.exports = userConroller;
