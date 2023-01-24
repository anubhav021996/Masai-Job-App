const express = require("express");
const router = express.Router();

const Job = require("../models/job.model");
const Authentication = require("../middlewares/authentication.middleware");
const Authorization = require("../middlewares/authorization.middleware");

router.post("/", Authentication, Authorization, async (req, res) => {
  try {
    let job = await Job.create(req.body);
    res.status(200).send({ job, msg: "Job Created Successfully" });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.patch("/:id", Authentication, Authorization, async (req, res) => {
  try {
    let job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send({ job, msg: "Job Updated Successfully" });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.delete("/:id", Authentication, Authorization, async (req, res) => {
  try {
    let job = await Job.findByIdAndDelete(req.params.id);
    res.status(200).send({ job, msg: "Job Deleted Successfully" });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/", async (req, res) => {
  try {
    let job = await Job.find();
    res.status(200).send(job);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
