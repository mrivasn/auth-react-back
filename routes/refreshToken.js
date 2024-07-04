const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("refesh token")
});

module.exports = router;