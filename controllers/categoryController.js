const Category = require("./../models/categoryModel");
const factory = require("./handlerFactory");

exports.getAllCategories = factory.getAll(Category);

exports.setCategoryCreatedBy = (req, res, next) => {
  if (!req.body.created_by) req.body.created_by = req.user.id;
  next();
};

exports.getCategory = factory.getOne(Category);
exports.createCategory = factory.createOne(Category);
exports.updateCategory = factory.updateOne(Category);
exports.deleteCategory = factory.deleteOne(Category);
