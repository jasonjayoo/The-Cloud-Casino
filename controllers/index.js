const router = require("express").Router();

const apiRoutes = require("./API");
const homeRoutes = require("./homeRoutes");

router.use("/", homeRoutes);
router.use("/API", apiRoutes);

module.exports = router;
