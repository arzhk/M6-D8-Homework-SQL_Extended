const router = require("express").Router();

const articlesRouter = require("./articles");
const categoriesRouter = require("./categories");
const authorsRouter = require("./authors");

router.use("/articles", articlesRouter);
router.use("/categories", categoriesRouter);
router.use("/authors", authorsRouter);

module.exports = router;
