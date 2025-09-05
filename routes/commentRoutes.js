const express = require("express");
const commentController = require("./../controllers/commentController");
const authController = require("./../controllers/authController");
const router = express.Router();

router.use(authController.protect);
router
  .route("/:articleId")
  .get(commentController.getAllComments)
  .post(
    authController.protect,
    commentController.setCommentAuthor,
    commentController.createComment
  );

router
  .route("/:id")
  .get(commentController.getComment)
  .patch(
    authController.protect,
    commentController.checkPrivilege,
    commentController.updateComment
  )
  .delete(
    authController.protect,
    commentController.checkPrivilege,
    commentController.deleteComment
  );

router
  .route("/publish/:id")
  .patch(
    authController.restrictTo("admin"),
    commentController.setCommentAttributes,
    commentController.updateComment
  );

router
  .route("/unpublish/:id")
  .patch(
    authController.restrictTo("admin"),
    commentController.setCommentAttributes,
    commentController.updateComment
  );

module.exports = router;
