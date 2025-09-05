const express = require("express");
const homeController = require("./../controllers/homeController");
const authController = require("./../controllers/authController");
const router = express.Router();

router.route("/").get(homeController.getAllArticles);

module.exports = router;
