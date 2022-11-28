var express = require("express");
var router = express.Router();
const os = require("os");
/* GET home page. */
router.get("/", function (req, res, next) {
  try {
    const systemInfo = {
      hostname: os.hostname(),
      type: os.type(),
      platform: os.platform(),
    };
    if (!systemInfo) {
      throw new Error("System info not found");
    }
    res.status(200).json(systemInfo);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
router.get("/cpus", function (req, res, next) {
  try {
    const cpus = os.cpus();
    console.log(cpus.length);
    if (!cpus || cpus.length == 0) {
      throw new Error("ce pc n'a pas de cpus");
    }
    res.status(200).json(cpus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/cpus/:id", function (req, res, next) {
  try {
    const cpus = os.cpus();
    const { id } = req.params;
    if (!cpus || cpus.length == 0) {
      throw new Error("ce pc n'a pas de cpus");
    }
    if(id < 0 || id > cpus.length-1){
      throw new Error("invalid id");
    }
    console.log(cpus.length);
    res.status(200).json(cpus[id]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
