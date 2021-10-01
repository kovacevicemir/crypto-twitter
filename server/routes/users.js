var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", async (req, res) => {
  try {
    res.status(200).json({ success: true, data: "This is some data" });
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
});

module.exports = router;
