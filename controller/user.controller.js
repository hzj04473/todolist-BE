const User = require('../model/User');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const userController = {};

userController.createUser = async (req, res) => {
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

userController.loginWithEmail = async (req, res) => {
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

userController.getUser = async (req, res) => {
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

userController.logoutUser = (req, res) => {
  try {
    res.status(200).json({ status: 'success' });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

// 회원정보 비밀번호 체크
userController.editUserPasswordConfirm = async (req, res) => {
  try {
    const { email, passwordConfirm } = req.body;

    const user = await User.findOne({ email }, ' -createdAt -updatedAt -__v');

    if (user) {
      const isMath = bcrypt.compareSync(passwordConfirm, user.password);
      // console.log(isMath);
      if (isMath) {
        // console.log(isMath);
        // res.send('비밀번호 체크 성공');
        return res.status(200).json({ status: 'success', isMath });
      } else {
        throw new Error('회원의 비밀번호가 틀립니다.');
      }
    }
    throw new Error('가입된 회원이 아닙니다.');
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

// 회원정보 수정
userController.editUser = async (req, res) => {
  try {
    const { name, password, isMath } = req.body;

    if (isMath) {
      const { userId } = req;

      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);

      const user = await User.findOne(
        { _id: userId },
        ' -createdAt -updatedAt -__v'
      );

      if (!user) {
        throw new Error('사용자를 찾을 수 없습니다.');
      }

      // 비밀번호가 입력되지 않았을 경우, 이름만 업데이트
      let updateUser = {};

      // 새로운 비밀번호가 기존 비밀번호와 다른 경우에만 업데이트
      const isSamePassword = await bcrypt.compare(password, user.password);
      if (!password) {
        updateUser = await User.updateOne(
          { _id: userId },
          { $set: { name: name } }
        );
      } else {
        if (!isSamePassword) {
          updateUser = await User.updateOne(
            { _id: userId },
            { $set: { name: name, password: hash } }
          );
        } else {
          updateUser = await User.updateOne(
            { _id: userId },
            { $set: { name: name } }
          );
        }
      }
      res.status(200).json({ status: 'ok', data: updateUser }); //   // throw new Error('이미 가입이 된 유저 입니다.');
    } else {
      throw new Error('회원의 비밀번호 체크가 되지 않았습니다.');
    }
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};
module.exports = userController;
