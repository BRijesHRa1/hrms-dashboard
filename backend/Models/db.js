const mongoose = require('mongoose');
const config = require('../config');

const mongo_url = config.MONGODB_URI;

mongoose.connect(mongo_url)
    .then(() => {
        console.log('MongoDB Connected...');
    }).catch((err) => {
        console.log('MongoDB Connection Error: ', err);
    })