const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/parrotAppDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log('MongoDB verbunden');

    const hashedPassword = await bcrypt.hash('knownpassword', 10);

    const newUser = new User({
        username: 'knownuser',
        email: 'knownuser@example.com',
        password: hashedPassword,
        createdAt: new Date()
    });

    try {
        await newUser.save();
        console.log('Known user created');
        mongoose.connection.close();
    } catch (err) {
        console.error('Fehler beim Erstellen des Benutzers', err);
        mongoose.connection.close();
    }
}).catch(err => console.error('Fehler beim Verbinden mit MongoDB', err));
