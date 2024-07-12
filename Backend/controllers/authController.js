import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenandSetCookie from "../utils/generateToken.js"
export const register = async (req, res) => {
  try {
    const { name, email, password, } =
      req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        Error: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const newUser = new User({
      name,
      email,
      password: hashedPassword,
     
    });

    if (newUser) {
      generateTokenandSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,

      });
    } else {
      res.status(400).json({
        err: "Invalid User data",
      });
    }
  } catch (err) {
    console.log("error in registering", err.message);
    res.status(500).json({
      err: "Internal Server Error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      res.status(400).json({
        Error: "Invalid credentials",
      });
    }

    generateTokenandSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      name:user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({
      err: "Internal Server Error",
    });
  }
};


