const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: Number,
    username: String,
    guildId: Number,
    guildName: String,
    characterId: Number,
    characterName: String,
    characterClass: String,
    characterRace: String,
    characterLevel: Number,
    characterXP: Number,
    characterHP: Number,
    characterMP: Number,
    characterSTR: Number,
    characterDEX: Number,
    characterCON: Number,
    characterINT: Number,
    characterWIS: Number,
    characterCHA: Number
});

const User = mongoose.model('User', userSchema);

module.exports = User;