const thoughtRoutes = require('./thought');
const userRoutes = require('./user');
const router = require('express').Router();

router.use('/api/thoughts', thoughtRoutes);
router.use('/api/users', userRoutes);

module.exports = router;