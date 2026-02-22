const Project = require("../models/project.model");
const createError = require("http-errors");

const toResponse = (doc) => {
  const obj = doc.toObject();
  obj.id = obj._id;
  delete obj._id;
  delete obj.__v;
  return obj;
};

// POST api/projects
exports.createProject = async (req, res, next) => {
  try {
    const created = await Project.create(req.body);
    res.status(201).json({
      success: true,
      message: "Project added successfully.",
      data: toResponse(created),
    });
  } catch (err) {
    next(err);
  }
};

// GET api/projects
exports.getProjects = async (req, res, next) => {
  try {
    const docs = await Project.find();
    res.json({
      success: true,
      message: "Projects list retrieved successfully.",
      data: docs.map(toResponse),
    });
  } catch (err) {
    next(err);
  }
};

// GET api/projects/:id
exports.getProjectById = async (req, res, next) => {
  try {
    const doc = await Project.findById(req.params.id);
    if (!doc) return next(createError(404, "Project not found"));

    res.json({
      success: true,
      message: "Project retrieved successfully.",
      data: toResponse(doc),
    });
  } catch (err) {
    next(err);
  }
};

// PUT api/projects/:id
exports.updateProject = async (req, res, next) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return next(createError(404, "Project not found"));

    res.json({
      success: true,
      message: "Project updated successfully.",
    });
  } catch (err) {
    next(err);
  }
};

// DELETE api/projects/:id
exports.deleteProject = async (req, res, next) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return next(createError(404, "Project not found"));

    res.json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (err) {
    next(err);
  }
};
