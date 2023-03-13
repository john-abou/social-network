const thoughtRoutes = require('./thought');
const userRoutes = require('./user');
const router = require('express').Router();

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;