const mongoose = require('mongoose');
const User = require('./models/User');
const Message = require('./models/Message');

mongoose.connect('mongodb://localhost:27017/parrotAppDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB verbunden');
    return Message.find().populate('from to', 'username email');
}).then(messages => {
    console.log(messages);
    process.exit(0);
}).catch(err => {
    console.error('Fehler beim Abrufen der Nachrichten', err);
    process.exit(1);
});
