const express = require("express");
const articleController = require("./../controllers/articleController");
const authController = require("./../controllers/authController");
const router = express.Router();
const multer = require("multer");

router.use(authController.protect);
router.route("/").get(articleController.getAllArticles).post(
  //router.use(authController.protect),
  articleController.uploadUserPhoto,
  articleController.setArticleAttributes,
  articleController.createArticle
);

router
  .route("/:id")
  .get(articleController.getArticle)
  .patch(
    articleController.checkPrivilege,
    articleController.setArticleAttributes,
    articleController.updateArticle
  )
  .delete(articleController.checkPrivilege, articleController.deleteArticle);

router
  .route("/publish/:id")
  .patch(
    authController.restrictTo("admin"),
    articleController.setArticleAttributes,
    articleController.updateArticle
  );

module.exports = router;
