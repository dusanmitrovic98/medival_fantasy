const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: Number,
    username: String,
    guildId: Number,
    guildName: String,
    characters: [String],
    selectedCharacterId: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User; 