const mongoose = require('mongoose');

mongoose.connect('deine-mongodb-url', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB verbunden'))
  .catch(err => console.log(err));

module.exports = mongoose;
