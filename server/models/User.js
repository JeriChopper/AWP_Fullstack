/// Jericho Koskinen
/// 0607024
/// Project started 14.2.2024
/// Sources and references will be linked near the code

// User Schema

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let userSchema = new Schema ({
    email: {type: String}, // Auth data
    password: {type: String}, 
    displayName: { type: String }, //Profile data
    bio: { type: String }, 
    gender: { type: String, enum: ['male', 'female', 'other'] }, 
    likedUsers: [{ type: Schema.Types.ObjectId, ref: 'users' }], // Find page data
    matches: [{ type: Schema.Types.ObjectId, ref: 'users' }],  
    chats: [{ // Chat data 
        user: { type: Schema.Types.ObjectId, ref: 'users' },
        messages: [{
            sender: { type: Schema.Types.ObjectId, ref: 'users' },
            content: { type: String },
            timestamp: { type: Date, default: Date.now }
        }]
    }],
});

module.exports = mongoose.model('users', userSchema);