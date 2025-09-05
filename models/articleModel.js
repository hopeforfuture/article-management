const mongoose = require("mongoose");
const slugify = require("slugify");

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "An article must have a title"],
      unique: true,
      trim: true,
    },
    content: {
      type: String,
      required: [true, "An article must have a body"],
      trim: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "An article must belong to a category"],
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    slug: String,
    thumbnail: String,
    is_active: {
      type: Boolean,
      default: true,
    },
    is_published: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

articleSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

articleSchema.pre(/^find/, function (next) {
  this.populate({
    path: "author",
    select: "name",
  }).populate({
    path: "category",
    select: "name",
    populate: false,
  });
  next();
});

articleSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "article", // the field in Comment that references Article
  localField: "_id", // the field in Article
});

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
