const { Thought, User } = require('../models');

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Course.findOne({ _id: req.params.id }).select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const user = await User.findOne({ username: req.body.username });
            const thought = await Thought.create(req.body);
            user.thoughts.push(thought)
            await user.save();

            res.status(500).json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.id });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.status(200).json({ message: 'Thought deleted!' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { thoughtText: req.body.thoughtText });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.status(200).json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }

    },

    async addReaction (req, res) {
        try {
            const reactionBody = req.body.reactionBody;
            const result = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $addToSet: { reactions: { reactionBody } } },
                { new: true}
            );
            if (!result) {
                return res.status(404).json({ message: 'No thought with this id!' })
            }
            res.status(200).json(result);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteReaction (req, res) {
        try {
            const result = await Thought.findByIdAndUpdate(
                { _id: req.params.id },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true}
            );
            if (!result) {
                return res.status(404).json({ message: 'No thought with this id!' })
            }
            res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    }
};
