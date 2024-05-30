const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/parrotAppDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log('MongoDB verbunden');

    try {
        const users = await User.find({});
        console.log('Benutzer in der Datenbank:', users);
        mongoose.connection.close();
    } catch (err) {
        console.error('Fehler beim Abrufen der Benutzer', err);
        mongoose.connection.close();
    }
}).catch(err => console.error('Fehler beim Verbinden mit MongoDB', err));
