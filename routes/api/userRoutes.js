const router = require('express').Router();

/*Express router instance is tying functions to corresponding route */

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

// /api/users
// Get all users & create new user
router.route('/').get(getUsers).post(createUser);

// Get a single user by id (will populated thought and friend data)
router
    .route('/:userId')
    // Get single user
    .get(getSingleUser)
    // Update users
    .put(updateUser)
    // Delete users
    .delete(deleteUser);

// Add new friend
router.route('/:userId/friends/:friendId').post(addFriend);

// Remove friend
router.route('/:userId/friends/:friendId').delete(removeFriend);

// Export user route
module.exports = router;