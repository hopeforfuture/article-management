const Article = require("./../models/articleModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getAllArticles = catchAsync(async (req, res, next) => {
  const articles = await Article.find({ is_published: true })
    .select("-is_published -is_active")
    .populate({
      path: "comments",
      match: { is_published: true }, // only published comments
      populate: { path: "author", select: "name email" }, // get commenter details
    })
    .populate("author", "name email"); // get article author

  res.status(200).json({
    status: "success",
    total: articles.length,
    data: {
      articles,
    },
  });
});
