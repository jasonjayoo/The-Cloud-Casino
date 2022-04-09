const router = require("express").Router();
const userRoutes = require("./userRoutes");
const gameRoutes = require("./gameRoutes");
const freeRoutes = require("./freeRoutes");

router.use("/user", userRoutes);
router.use("/game", gameRoutes);
router.use("/free", freeRoutes);

module.exports = router;
