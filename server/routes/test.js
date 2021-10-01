var express = require("express");
var router = express.Router();

/* GET test */
router.get("/", async (req, res) => {
  try {
    res.status(200).json("This is some data from backend /test");
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
});

module.exports = router;
