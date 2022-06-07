// Import/require models
const { User, Thought } = require('../models');

// Exporting controllers' functions 
module.exports = {
    // Manipulating models' data received and initiating the view rendering process

    // Get all thoughts
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    // Get a single thought
    getThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
          :  res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // create a new thought
    createThought(req, res) {
        Thought.create(req.body)
        // Thoughts are associated to user, so User is updated to add the ID of the new thought to their thoughts array.
        .then((thought) => {
            return User.findOneAndUpdate(
                {_id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
            )
        })
        .then((user) =>
        !user
            ? res.status(404).json({
              message: 'Thought created, but found no user with that ID',
            })
            : res.json('Thought created 🎉')
        )
        .catch((err) => res.status(500).json(err));
    },
    // Update a thought
    updateThought(req, res) {
        // Using findOneAndUpdate method
        Thought.findOneAndUpdate(
            // Find that one thought
            {_id: req.params.thoughtId},
            // $set operator to inject the request body (mongodb).
            { $set: req.body },
            // Enforces validation.
            { runValidators: true, new: true }
        )
        .then((thought) => 
            !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Delete a thought and associated apps
    deleteThought(req, res) {
        // Find one thought and modify
        Thought.findOneAndRemove({ _id: req.params.userId })
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            // Find user associated with thought and update their thoughts array
            : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
        )
        .then((user) =>
            !user
            ? res.status(404).json({
              message: 'Thought created but no user with this id!',
            })
            : res.json({ message: 'Successfully deleted thought!' })
        )
        .catch((err) => res.status(500).json(err));
    },
    
    // Reaction

    // With the mongodb $addToSet operator, the entire body of reaction is able to be added (a unique method).
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    a},
    // Find thought id remove reaction id from/update array.
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
}