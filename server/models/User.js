// User Schema

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let userSchema = new Schema ({
    email: {type: String},
    password: {type: String},
    likedUsers: [{ type: Schema.Types.ObjectId, ref: 'users' }], 
    matches: [{ type: Schema.Types.ObjectId, ref: 'users' }], 
    chats: [{
        user: { type: Schema.Types.ObjectId, ref: 'users' },
        messages: [{
            sender: { type: Schema.Types.ObjectId, ref: 'users' },
            content: { type: String },
            timestamp: { type: Date, default: Date.now }
        }]
    }],
});

module.exports = mongoose.model('users', userSchema);