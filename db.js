const mongoose = require('mongoose');

const { mongodb } = require('./config.json');

let client = null;
let dbName = 'MedievalFantasy';
let db = null;
let characters = null;

const connect = async () => {
    try {
        client = await mongoose.connect(mongodb, {
            dbName: dbName,
          });
        console.log('Connected to MongoDB!');
    } catch (err) {
        console.error(err);
    }
}

const deleteDatabase = async () => {
    await client.connection.dropDatabase().then(() => {
        console.log('Dropped the database.');
    }).catch(err => {
        console.log(err);
    });
}

module.exports = {
    connect,
    deleteDatabase,
}
