const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AppConstant = require("../common/appconstants");

// Register a new user
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      success: true,
      message: AppConstant.REGISTER_USER,
      token,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Login an existing user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, status: AppConstant.STATUS[0] });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: AppConstant.USER_NOT_FOUND });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: AppConstant.INVALID_CREDENTIALS });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      success: true,
      message: AppConstant.LOGIN_USER,
      token,
      data: user,
    });
  } catch (err) {
    console.log(err)
    res.status(400).json({ success: false, message: err.message });
  }
};