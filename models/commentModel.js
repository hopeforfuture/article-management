const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    article_comment: {
      type: String,
      required: [true, "A comment can not be empty"],
      trim: true,
    },
    article: {
      type: mongoose.Schema.ObjectId,
      ref: "Article",
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
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

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
