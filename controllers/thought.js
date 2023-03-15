const { User, Thought } = require('../models');

module.exports = {
    allThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },

    newThought(req, res) {
        // create a new Thought
        Thought.create(req.body)
            // then update the User model, push the created Thought ID to the User Thought's array field
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { username: req.body.username },
                    { $addToSet: { thoughts: _id } },
                    { new: true }
                );
            })
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'No user with this ID.' });
                    return;
                }
                res.json(user);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err)
            });
    },

    getThoughtById(req, res) {
        Thought.findById({ _id: req.params.thoughtId })
            .then((thought) => 
            !thought 
                ? res.status(404).json({message: 'no thought with that ID'})
                : res.status(200).json(thought)
            )
            .catch((err) => res.status(500).json(err));

    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true }
        )
        .then((thought) =>
            !thought
                ? res.status(404).json( {message: 'No thought with this ID.' })
                : res.status(200).json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought with that ID.'})
                : res.status(200).json({ message: 'Thought and associated reactions have been deleted.' })
            )
            .catch( (err) => res.status(500).json(err) );
    },

    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        )
        .then((thought) =>
            !thought
                ? res.status(404).json( {message: 'No thought with this ID.' })
                : res.status(200).json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
        .then((thought) =>
            !thought
                ? res.status(404).json( {message: 'No thought with this ID.' })
                : res.status(200).json({ message: 'Reaction has been successfully deleted.' })
        )
        .catch((err) => res.status(500).json(err));
    }
};