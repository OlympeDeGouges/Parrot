const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/parrotAppDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB verbunden');

    const email = 'test@example.com';
    const password = 'yourpassword';

    bcrypt.hash(password, 10, async (err, hash) => {
        if (err) throw err;

        const newUser = new User({
            username: 'testuser',
            email: email,
            password: hash,
            createdAt: new Date()
        });

        try {
            await newUser.save();
            console.log('Benutzer erstellt');
            mongoose.connection.close();
        } catch (err) {
            console.error('Fehler beim Erstellen des Benutzers', err);
        }
    });
}).catch(err => console.error('Fehler beim Verbinden mit MongoDB', err));
