const { Schema, model, Types } = require('mongoose');
const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
            ref: 'user'
        },
        reactions:[{
            type: reactionSchema,
            ref: 'reaction'
        
        }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})
.set(function (value) {
    this._reactionCount = value;
});

thoughtSchema.virtual('formattedCreateAt').get(function () {
    return this.createdAt.toLocaleDateString();
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;