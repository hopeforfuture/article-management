const multer = require("multer");
const Article = require("./../models/articleModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");
const slugify = require("slugify");

exports.getAllArticles = factory.getAll(Article);

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/articles");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `article-${req.user.id}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");

exports.setArticleAttributes = (req, res, next) => {
  const path = req.path;
  if (!req.body.author) req.body.author = req.user.id;
  if (req.file) req.body.thumbnail = req.file.filename;
  if (req.body.title) req.body.slug = slugify(req.body.title, { lower: true });
  if (path.includes("publish")) {
    req.body.is_published = true;
  }
  next();
};

exports.checkPrivilege = async (req, res, next) => {
  let article;
  if (req.user.role === "user") {
    article = await Article.findById(req.params.id);
    if (req.user.id != article.author._id) {
      return next(new AppError("Operation not allowed.", 403));
    }
  }
  next();
};

exports.getArticle = factory.getOne(Article);
exports.createArticle = factory.createOne(Article);
exports.updateArticle = factory.updateOne(Article);
exports.deleteArticle = factory.deleteOne(Article);
