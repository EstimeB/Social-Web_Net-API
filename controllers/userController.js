// Import/require models
const { User, Thought } = require('../models');

// Exporting controllers' functions 
module.exports = {
    // Manipulating models' data received and initiating the view rendering process

    // Get all users
    getUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    // Get a single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        // The select function is used to remove Identifier (one-to-one relationship referencing).
        .select('-__v')
        .then((user) =>
            !user
            ? res.status(404).json({ message: 'No user with that ID' })
          :  res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // create a new user
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    // Update a user
    updateUser(req, res) {
        // Using findOneAndUpdate method
        User.findOneAndUpdate(
            // Find that one user
            {_id: req.params.userId},
            // $set operator to inject the request body (mongodb).
            { $set: req.body },
            // Enforces validation.
            { runValidators: true, new: true }
        )
        .then((user) => 
            !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Delete a user and associated apps
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) =>
            !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : Thought.deleteMany({ _id: { $in: user.thoughts } })
        )
        .then(() => res.json({ message: 'User and associated apps deleted!' }))
        .catch((err) => res.status(500).json(err));
    },
}