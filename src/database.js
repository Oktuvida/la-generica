const mongoose = require('mongoose');
const URL = 'mongodb://mongodb:27017'

mongoose
    .connect(URL, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    })
    .then(_ => { console.log('MongoDBDB is connected') })
    .catch(err => console.error(err));

module.exports = mongoose;
