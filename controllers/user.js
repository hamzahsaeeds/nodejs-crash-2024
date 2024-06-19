const User = require("../models/user");

const handleGetAllUsers = async (req, res) => {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
};

const handleGetUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ msg: "User not found" });
  return res.json(user);
};

const handleUpdateUserById = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }); // Update and return new data
    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    return res.status(500).json({ msg: "Error updating user" });
  }
};

const handleDeleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id); // Find and delete by ID
    if (!deletedUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.json({ msg: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    return res.status(500).json({ msg: "Error deleting user" });
  }
};

const handleCreateNewUser = async (req, res) => {
  const body = req.body;
  const { first_name, last_name, email, gender, job_title } = body;
  if (!first_name || !last_name || !email || !gender || !job_title) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  const result = await User.create({
    firstName: first_name,
    lastName: last_name,
    email: email,
    gender: gender,
    jobTitle: job_title,
  });
  console.log("result", result);
  return res.status(201).json({ msg: "success", id: result._id });
};

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
