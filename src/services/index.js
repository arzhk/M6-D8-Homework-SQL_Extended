const router = require("express").Router();

const articlesRouter = require("./articles");
const categoriesRouter = require("./categories");
const authorsRouter = require("./authors");
const responsesRouter = require("./responses");

router.use("/articles", articlesRouter);
router.use("/categories", categoriesRouter);
router.use("/authors", authorsRouter);
router.use("/responses", responsesRouter);

module.exports = router;
