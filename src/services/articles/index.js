const router = require("express").Router();

const dbFuncs = require("../../utils/dbFuncs.js");

router.get("/", async (req, res, next) => {
  try {
    if (req.query.search) {
      if (req.query.by === "title") {
        const response = await dbFuncs.findByTitleSearch("articles", req.query.search);
        res.send(response.rows);
      } else if (req.query.by === "content") {
        const response = await dbFuncs.findByContentSearch("articles", req.query.search);
        res.send(response.rows);
      }
    } else {
      const response = await dbFuncs.findAll("articles");
      res.send(response.rows);
    }
  } catch (err) {
    console.error(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    if (req.query.details === "extra") {
      const response = await dbFuncs.findArticleWithAuthorAndCategory(req.params.id);
      if (response.rowCount !== 0) {
        res.send(response.rows);
      } else {
        res.send("No article found with that ID");
      }
    } else {
      const response = await dbFuncs.findById("articles", req.params.id);
      if (response.rowCount !== 0) {
        res.send(response.rows);
      } else {
        res.send("No article found with that ID");
      }
    }
  } catch (err) {
    console.error(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const response = await dbFuncs.createNewArticle("articles", req.body);
    if (response.rowCount === 1) {
      res.send("Successfully added new article");
    } else {
      throw new Error("Error adding new article");
    }
  } catch (err) {
    console.error(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const response = await dbFuncs.findByIdAndUpdate("articles", req.params.id, req.body);
    res.send(response.rows);
  } catch (err) {
    console.error(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const response = await dbFuncs.findByIdAndDelete("articles", req.params.id);
    if (response.rowCount === 1) {
      res.send(response);
    } else {
      throw new Error("Error deleting article");
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
