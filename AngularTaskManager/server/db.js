const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/angulartaskmanager').then(console.log("Connected successfully 😊😊😊"))
    } catch (error) {
        console.error('Some error occured while connecting with database', error);
    }
}

module.exports = connect;