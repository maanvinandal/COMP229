const Reference = require("../models/reference.model");
const createError = require("http-errors");

const toResponse = (doc) => {
  const obj = doc.toObject();
  obj.id = obj._id;
  delete obj._id;
  delete obj.__v;
  return obj;
};

// POST api/references
exports.createReference = async (req, res, next) => {
  try {
    const created = await Reference.create(req.body);
    res.status(201).json({
      success: true,
      message: "Reference added successfully.",
      data: toResponse(created),
    });
  } catch (err) {
    next(err);
  }
};

// GET api/references
exports.getReferences = async (req, res, next) => {
  try {
    const docs = await Reference.find();
    res.json({
      success: true,
      message: "References list retrieved successfully.",
      data: docs.map(toResponse),
    });
  } catch (err) {
    next(err);
  }
};

// GET api/references/:id
exports.getReferenceById = async (req, res, next) => {
  try {
    const doc = await Reference.findById(req.params.id);
    if (!doc) return next(createError(404, "Reference not found"));

    res.json({
      success: true,
      message: "Reference retrieved successfully.",
      data: toResponse(doc),
    });
  } catch (err) {
    next(err);
  }
};

// PUT api/references/:id
exports.updateReference = async (req, res, next) => {
  try {
    const updated = await Reference.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return next(createError(404, "Reference not found"));

    res.json({
      success: true,
      message: "Reference updated successfully.",
    });
  } catch (err) {
    next(err);
  }
};

// DELETE api/references/:id
exports.deleteReference = async (req, res, next) => {
  try {
    const deleted = await Reference.findByIdAndDelete(req.params.id);
    if (!deleted) return next(createError(404, "Reference not found"));

    res.json({
      success: true,
      message: "Reference deleted successfully.",
    });
  } catch (err) {
    next(err);
  }
};
