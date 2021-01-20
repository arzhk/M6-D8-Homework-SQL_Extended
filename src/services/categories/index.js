const router = require("express").Router();

const dbFuncs = require("../../utils/dbFuncs.js");

router.get("/", async (req, res, next) => {
  try {
    const response = await dbFuncs.findAll("categories");
    res.send(response.rows);
  } catch (err) {
    console.error(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const response = await dbFuncs.findById("categories", req.params.id);
    res.send(response.rows);
  } catch (err) {
    console.error(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const response = await dbFuncs.createNewArticle("categories", req.body);
    if (response.rowCount === 1) {
      res.send("Successfully added new category");
    } else {
      throw new Error("Error adding new category");
    }
  } catch (err) {
    console.error(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const response = await dbFuncs.findByIdAndUpdate("categories", req.params.id, req.body);
    res.send(response.rows);
  } catch (err) {
    console.error(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const response = await dbFuncs.findByIdAndDelete("categories", req.params.id);
    if (response.rowCount === 1) {
      res.send(response);
    } else {
      throw new Error("Error deleting category");
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
