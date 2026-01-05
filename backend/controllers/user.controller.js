import Profile from "../models/profile.models.js";
import User from "../models/user.models.js";

import bcrypt from "bcrypt";
import crypto from "crypto";

export const register = async (req, res) => {
  try {
    const { name, email, password, userName } = req.body;

    if (!name || !email || !password || !userName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({
      email,
    });

    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,

      email,

      password: hashedPassword,

      userName,
    });

    await newUser.save();

    const profile = new Profile({ userId: newUser._id });

    return res.json({ message: "User Created" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// To login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are reuired" });
    }

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = crypto.randomBytes(32).toString("hex");

    const updatedUser = await User.findOneAndUpdate(
      { email },

      { token },

      { new: true } // returns the updated document
    );

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// To Upload the profile picture

export const uploadProfilePicture = async (req, res) => {
  const { token } = req.body;

  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const user = await User.findOne({ token });

    if (!user) return res.status(404).json({ message: "User not found" });

    user.profilePicture = req.file.filename;

    await user.save();

    return res

      .status(201)

      .json({ message: "Profile picture updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// To Update the profile picture of user

export const updateUserProfile = async (req, res) => {
  console.log(req.body);

  try {
    const { token, ...newUserData } = req.body;

    const user = await User.findOne({ token: token });

    if (!user) return res.status(404).json({ message: "User not found" });

    const { userName, email } = newUserData;

    const existingUser = await User.findOne({ $or: [{ userName }, { email }] });

    if (existingUser) {
      if (existingUser || String(existingUser._id) !== String(user._id)) {
        return res.status(400).json({ message: "User already exist" });
      }
    }

    Object.assign(user, newUserData);

    await user.save();

    return res.status(201).json({ message: "User updated" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// To Get user Profile that Have Logged In

export const getUserProfile = async (req, res) => {
  try {
    const { token } = req.body;

    const user = await User.findOne({ token: token });

    if (!user) return res.status(404).json({ message: "User not Found" });

    const userProfile = await Profile.findOne({ userId: user._id }).populate(
      "userId",

      "name email userName profilePicture"
    );

    return res.status(200).json({ userProfile });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
