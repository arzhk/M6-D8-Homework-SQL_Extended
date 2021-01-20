const router = require("express").Router();

const e = require("express");
const dbFuncs = require("../../utils/dbFuncs.js");

router.get("/", async (req, res, next) => {
  try {
    const response = await dbFuncs.findAll("responses");
    res.send(response.rows);
  } catch (err) {
    console.error(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const response = await dbFuncs.findById("responses", req.params.id);
    res.send(response.rows);
  } catch (err) {
    console.error(err);
  }
});

router.get("/data/all", async (req, res, next) => {
  try {
    const response = await dbFuncs.getAllResponseData();
    res.send(response.rows);
  } catch (err) {
    console.error(err);
  }
});

router.get("/data/:id", async (req, res, next) => {
  try {
    const response = await dbFuncs.getResponseDataById(req.params.id);
    res.send(response.rows);
  } catch (err) {
    console.error(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const response = await dbFuncs.createNewArticle("responses", req.body);
    if (response.rowCount === 1) {
      res.send("Successfully added new response");
    } else {
      throw new Error("Error adding new response");
    }
  } catch (err) {
    console.error(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const response = await dbFuncs.findByIdAndUpdate("responses", req.params.id, req.body);
    res.send(response.rows);
  } catch (err) {
    console.error(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const response = await dbFuncs.findByIdAndDelete("responses", req.params.id);
    if (response.rowCount === 1) {
      res.send(response);
    } else {
      throw new Error("Error deleting response");
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
