const { User, Thought } = require('../models');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async getOneUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id }).select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with this id!' });
            }
            res.status(500).json(err);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(200).json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const result = await User.findeOneAndUpdate(
                { _id: req.params.id },
                {
                    username: req.body.username,
                    email: req.body.email,
                });
            if (!result) {
                res.status(404).json({ message: 'No user with this id!' });
            } res.status(200).json(result);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id });
            for (let i = 0; i < user.thoughts.length; i++) {
                thought = user.thoughts[i];
                await Thought.findOneAndDelete({ _id: thought });
            }
            const result = await User.findOneAndDelete({ _id: req.params.id });
            if (!result) {
                return res.status(404).json({ message: 'No user with this id!' });
            }
            res.status(200).json({ message: 'User deleted!' })
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async addToFriendList(req, res) {
        try {
            const result = await User.findeByIdAndUpdate(
                { _id: req.params.id },
                { $addToSet: { friends: req.params.friendId } },
                { new: true, runValidators: true }
            );
            if (!result) {
                return res.status(404).json({ message: 'No user with this id!' });
            } res.status(200).json(result);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async removeFromFriendList (req, res) {
        try {
            const result = await User.findeByIdAndUpdate(
                { _id: req.params.id },
                { $pull: { friends: req.params.friendId } },
                { new: true, runValidators: true }
            )
            if (!result) {
                return res.status(404).json({ message: 'No user with this id!' });
            } res.status(200).json(result);

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
};
