const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
} = require('../../controllers/userController');

// /api/users
// Get all users & create new user
router.route('/').get(getUsers).post(createUser);

// Get a single user by id (will populated thought and friend data)
router
    .route('/:userId')
    .get(getSingleUser)
    // Update user
    .put(updateUser)
    // Delete user
    .delete(deleteUser);


module.exports = router;