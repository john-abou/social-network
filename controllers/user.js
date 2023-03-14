const { User, Thought } = require('../models');

module.exports = {
    allUsers(req, res) {
        User.find()
            .populate( 'thoughts' )
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
        },

    newUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err)
            });
        },

    getUserById(req, res) {
        User.findById({_id: req.params.userId})
            .populate( 'thoughts' )
            .then((user) => 
            !user 
                ? res.status(404).json({message: 'no user with that ID'})
                : res.status(200).json(user)
            )
            .catch((err) => res.status(500).json(err));

    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { new: true }
        )
        .then((user) => 
            !user
                ? res.status(404).json( {message: 'No user with this ID.' })
                : res.status(200).json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user with that ID.'})
                : Thought.deleteMany({ _id: { $in: user.thoughts }})
            )
            .then( () => res.status(200).json({ message: 'User and associated thoughts deleted.' })
            )
            .catch( (err) => res.status(500).json(err) );

    },

    addFriend(req, res) {
        User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
        )
        .then( (user) => 
            !user
                ? res.status(404).json({ message: 'No user with that ID.'})
                : res.status(200).json(user)
            )
        .catch( (err) => res.status(500).json(err));
    },

    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
        .then( (user) => 
            !user
                ? res.status(404).json({ message: 'No user with that ID.'})
                : res.status(200).json(user)
        )
        .catch( (err) => res.status(500).json(err));
    }
};