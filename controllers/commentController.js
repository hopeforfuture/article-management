const Comment = require("./../models/commentModel");
const Article = require("./../models/articleModel");
const factory = require("./handlerFactory");

exports.getAllComments = factory.getAll(Comment);

exports.setCommentAuthor = (req, res, next) => {
  if (!req.body.author) req.body.author = req.user.id;
  if (!req.body.article) req.body.article = req.params.articleId;
  next();
};

exports.setCommentAttributes = (req, res, next) => {
  const path = req.path;
  if (path.includes("unpublish")) {
    req.body.is_published = false;
  } else if (path.includes("publish")) {
    req.body.is_published = true;
  }
  next();
};

exports.checkPrivilege = async (req, res, next) => {
  let article;
  if (req.user.role === "user") {
    article = await Article.findById(req.params.articleId);
    if (req.user.id != article.author._id) {
      return next(new AppError("Operation not allowed.", 403));
    }
  }
  next();
};

exports.getComment = factory.getOne(Comment);
exports.createComment = factory.createOne(Comment);
exports.updateComment = factory.updateOne(Comment);
exports.deleteComment = factory.deleteOne(Comment);
