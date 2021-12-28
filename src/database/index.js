const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/compass');
mongoose.Promise = global.Promise;

module.exports = mongoose;