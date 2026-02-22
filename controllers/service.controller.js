const Service = require("../models/service.model");
const createError = require("http-errors");

const toResponse = (doc) => {
  const obj = doc.toObject();
  obj.id = obj._id;
  delete obj._id;
  delete obj.__v;
  return obj;
};

// POST api/services
exports.createService = async (req, res, next) => {
  try {
    const created = await Service.create(req.body);
    res.status(201).json({
      success: true,
      message: "Service added successfully.",
      data: toResponse(created),
    });
  } catch (err) {
    next(err);
  }
};

// GET api/services
exports.getServices = async (req, res, next) => {
  try {
    const docs = await Service.find();
    res.json({
      success: true,
      message: "Services list retrieved successfully.",
      data: docs.map(toResponse),
    });
  } catch (err) {
    next(err);
  }
};

// GET api/services/:id
exports.getServiceById = async (req, res, next) => {
  try {
    const doc = await Service.findById(req.params.id);
    if (!doc) return next(createError(404, "Service not found"));

    res.json({
      success: true,
      message: "Service retrieved successfully.",
      data: toResponse(doc),
    });
  } catch (err) {
    next(err);
  }
};

// PUT api/services/:id
exports.updateService = async (req, res, next) => {
  try {
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return next(createError(404, "Service not found"));

    res.json({
      success: true,
      message: "Service updated successfully.",
    });
  } catch (err) {
    next(err);
  }
};

// DELETE api/services/:id
exports.deleteService = async (req, res, next) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    if (!deleted) return next(createError(404, "Service not found"));

    res.json({
      success: true,
      message: "Service deleted successfully.",
    });
  } catch (err) {
    next(err);
  }
};
