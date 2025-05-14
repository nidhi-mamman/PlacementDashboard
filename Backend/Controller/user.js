const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Notice = require("../model/notice")

function capitalizeName(fname) {
  return fname
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

const createUser = async (req, res) => {
  try {
    // Regex For validations
    const namePattern = /^[A-Za-z]+(\s[A-Za-z]+)*$/;
    const emailPattern =
      /^[a-zA-Z0-9](?!.*\.\.)[a-zA-Z0-9._]*[a-zA-Z0-9]@(gmail\.com|yahoo\.com)$/;
    const passwordPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    const mobilePattern = /^\d{10}$/;

    // Getting data from the backend
    const { fname, email, password, branch, tel, semester } = req.body;


    const formattedName = capitalizeName(fname);

    if (!formattedName || !email || !password || !tel || !branch || !semester) {
      return res.status(400).json({
        msg: "Please Enter all fields.",
      });
    }

    if (!namePattern.test(formattedName)) {
      return res.status(400).json({
        msg: "Name should only contain alphabets",
      });
    }

    if (!emailPattern.test(email)) {
      return res.status(400).json({
        msg: "Invalid email! Use a valid Gmail or Yahoo email (e.g., example@gmail.com).",
      });
    }

    if (!passwordPattern.test(password)) {
      return res.status(400).json({
        msg: "Password must have atleast 8 characters containing alphanumerics(lowercase and uppercase),special symbols",
      });
    }

    if (!mobilePattern.test(tel)) {
      return res.status(400).json({
        msg: "Mobile number should have 10 digits.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        msg: "User already exists.",
      });
    }

    const encPassword = await bcrypt.hash(password, 10);

    const isPlacementOfficer = email === "nidhimamman3@gmail.com"

    const userData = {
      fname: formattedName,
      email: email,
      password: encPassword,
      tel: tel,
      semester: isPlacementOfficer ? "default" : semester || "default",
      branch: isPlacementOfficer ? "default" : branch || "default",
      isPlacementOfficer: isPlacementOfficer
    };


    const user = await User.create(userData);

    if (user) {
      return res.status(200).json({
        msg: "Signed up successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "User Not found",
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = await jwt.sign(
        { userId: user._id, email: user.email, isPlacementOfficer: user.isPlacementOfficer },
        process.env.SECRET_KEY,
        { expiresIn: "9999d" }
      );
      return res.status(200).json({
        msg: "Signed In Successfully",
        token: token,
        isPlacementOfficer: user.isPlacementOfficer,
        branch: user.branch
      });
    } else {
      return res.status(400).json({
        msg: "Invalid email or password",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

const getUser = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({
      userData,
    });
  } catch (error) {
    console.log(error);
  }
};

const fetchUsers = async (req, res) => {
  try {
    const users = await User.find({ isPlacementOfficer: false });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).send('User not found');
    }

    res.status(200).send('User deleted successfully');
  } catch (error) {
    res.status(500).send('Server error');
  }
}


const CreateNotice = async (req, res) => {
  try {
    const { description } = req.body;
    const notice = await Notice.create({
      description: description
    })
    if (notice) {
      res.status(200).json({
        msg: "Notice created successfully!"
      })
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
}

const fetchNotice = async (req, res) => {
  try {
    const notices = await Notice.find();
    res.status(200).json(notices);
  } catch (error) {
    console.error('Fetch notice error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { createUser, signIn, getUser, fetchUsers, deleteUserById, CreateNotice, fetchNotice };
