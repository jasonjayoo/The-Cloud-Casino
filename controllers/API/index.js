const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes')
const gameRoutes = require('./gameRoutes')
const freeRoutes = require('./freeRoutes')

router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);
router.use('/game', gameRoutes);
router.use('/free', freeRoutes);

module.exports = router;