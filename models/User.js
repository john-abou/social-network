const {Schema, Types} = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            Type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            Type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);


// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
    });

const User = model('User', userSchema);

module.exports = User;