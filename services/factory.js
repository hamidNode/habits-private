import AppError from "../utils/AppError.js";
import asyncWrapper from "../utils/asyncWrapper.js";

const factory = (Model) => ({
  // Create One
  createOne: asyncWrapper(async (req, res, next) => {
    const newDoc = await Model.create(req.body);
    res
      .status(201)
      .json({ status: "success", data: { doc: newDoc } });
  }),

  // Get One
  getOne: asyncWrapper(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    if (!doc) return next(new AppError("Document not found", 404));
    res.status(200).json({ status: "success", data: { doc } });
  }),

  // Get All
  getAll: asyncWrapper(async (req, res, next) => {
    const docs = await Model.find();
    res.status(200).json({
      status: "success",
      results: docs.length,
      data: { docs },
    });
  }),

  // Update One
  updateOne: asyncWrapper(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!doc) return next(new AppError("Document not found", 404));
    res.status(200).json({ status: "success", data: { doc } });
  }),

  // Delete One
  deleteOne: asyncWrapper(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) return next(new AppError("Document not found", 404));
    res.status(204).json({ status: "success", data: null });
  }),
});

export default factory;
