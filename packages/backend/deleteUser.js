const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/parrotAppDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log('MongoDB verbunden');
    try {
        await User.deleteOne({ username: 'testuser' });
        console.log('Benutzer gelöscht');
    } catch (err) {
        console.error('Fehler beim Löschen des Benutzers', err);
    } finally {
        mongoose.connection.close();
    }
}).catch(err => console.error('Fehler beim Verbinden mit MongoDB', err));
