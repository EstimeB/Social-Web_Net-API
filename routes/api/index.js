// Importing & require express/routes
const router = require('express').Router(); /*Express router instance is tying functions to corresponding route */
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

// Export routes
module.exports = router;