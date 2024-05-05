const mongoose = require('mongoose');

const { mongodb } = require('./config.json');

let client = null;
let dbName = 'MedievalFantasy';
let db = null;
let characters = null;

const connect = async () => {
    try {
        client = await mongoose.connect(mongodb);
        console.log('Connected to MongoDB!');
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    connect,
}