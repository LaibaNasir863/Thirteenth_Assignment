const express = require("express");
const router = express.Router();
const controller = require("../controllers/bookController");

router.get("/search", controller.searchBooks);
router.get("/available", controller.getAvailableBooks);
router.get("/", controller.getBooks);
router.get("/:id", controller.getBookById);
router.post("/", controller.createBook);
router.put("/:id", controller.replaceBook);
router.patch("/:id", controller.patchBook);
router.delete("/:id", controller.deleteBook);

module.exports = router;
