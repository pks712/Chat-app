import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createTokenandSaveCookie from "../jwt/generateToken.js";
export const Signup = async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;

    if (password !== confirmpassword) {
      return res.status(400).json({
        message: "password do not match",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exist" });
    }
    //hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      confirmpassword: hashedPassword,
    });
    await newUser.save();

    if (newUser) {
      createTokenandSaveCookie(newUser._id, res);
      res.status(201).json({
        message: "User registered successfully",
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Invalid User or Password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).json({ message: "Invalid User or Password" });
    }

    createTokenandSaveCookie(user._id, res);
    res.status(201).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const Logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getUserProfile = async (req,res) =>{

  try {

    const loggedInUser =req.user._id;
    const filterUsers = await User.find({_id:{$ne:loggedInUser}}).select("-password -confirmpassword");
res.status(201).json({filterUsers})


  } catch (error) {
    console.log( "Error in alluser controller:" + error);
    res.status(500).json({message:"Server error"})
  }
}
















