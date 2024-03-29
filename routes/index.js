// Import & require express/apiRoutes
const router = require('express').Router(); /*Express router instance is tying functions to corresponding route */
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  return res.send('Wrong route!');
});

module.exports = router;