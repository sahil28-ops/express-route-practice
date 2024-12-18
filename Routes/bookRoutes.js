const express = require("express");
const { getBook, postBook } = require("../controller/bookController");

const router = express.Router();

router.get("/:id", getBook);
router.post("/", postBook);

module.exports = router;
