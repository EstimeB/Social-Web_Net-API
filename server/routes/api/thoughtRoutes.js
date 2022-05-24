const router = require('express').Router();

/*Express router instance is tying functions to corresponding route */

const {
    getThoughts,
    getThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
// Get all & create new thoughts
router.route('/').get(getThoughts).post(createThought);

router
    .route('/:thoughtId')
    // Get single thought
    .get(getThought)
    // Update thoughts
    .put(updateThought)
    // Delete thoughts
    .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
// Create new reactions
router.route('/:thoughtId/reactions').post(addReaction);

// Delete reactions
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

// Export thought route
module.exports = router;