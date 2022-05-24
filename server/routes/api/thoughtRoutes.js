const router = require('express').Router();

const {
    getThoughts,
    getThought,
    createThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thoughtController');

// /api/thoughts
// Get all & create new thoughts
router.route('/').get(getThoughts).post(createThought);

router
    .route('/:thoughtId')
    // Get single thought
    .get(getThought)
    // Update thought
    .put(updateThought)
    // Delete thought
    .delete(deleteThought);

// Export thought route
module.exports = router;