const User = require("../models/user.model");
const createError = require("http-errors");

const toResponse = (doc) => {
  const obj = doc.toObject();
  obj.id = obj._id;
  delete obj._id;
  delete obj.__v;
  return obj;
};

// POST api/users
exports.createUser = async (req, res, next) => {
  try {
    const payload = { ...req.body, created: new Date(), updated: new Date() };
    const created = await User.create(payload);

    res.status(201).json({
      success: true,
      message: "User added successfully.",
      data: toResponse(created),
    });
  } catch (err) {
    next(err);
  }
};

// GET api/users
exports.getUsers = async (req, res, next) => {
  try {
    const docs = await User.find();
    res.json({
      success: true,
      message: "Users list retrieved successfully.",
      data: docs.map(toResponse),
    });
  } catch (err) {
    next(err);
  }
};

// GET api/users/:id
exports.getUserById = async (req, res, next) => {
  try {
    const doc = await User.findById(req.params.id);
    if (!doc) return next(createError(404, "User not found"));

    res.json({
      success: true,
      message: "User retrieved successfully.",
      data: toResponse(doc),
    });
  } catch (err) {
    next(err);
  }
};

// PUT api/users/:id
exports.updateUser = async (req, res, next) => {
  try {
    const payload = { ...req.body, updated: new Date() };
    const updated = await User.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });
    if (!updated) return next(createError(404, "User not found"));

    res.json({
      success: true,
      message: "User updated successfully.",
    });
  } catch (err) {
    next(err);
  }
};

// DELETE api/users/:id
exports.deleteUser = async (req, res, next) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return next(createError(404, "User not found"));

    res.json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (err) {
    next(err);
  }
};
