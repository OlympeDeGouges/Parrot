const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const axios = require('axios');
const User = require('./models/User');
const Message = require('./models/Message');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/parrotAppDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB verbunden'))
  .catch(err => console.error('Fehler beim Verbinden mit MongoDB', err));

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).send('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({
            username,
            email,
            password: hashedPassword,
            createdAt: new Date()
        });

        await user.save();
        res.status(201).send('User registered');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.send({ token });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/messages', async (req, res) => {
    const { from, to, content } = req.body;
    try {
        const sender = await User.findById(from);
        if (!sender) {
            return res.status(400).send('Sender not found');
        }

        const recipient = await User.findById(to);
        if (!recipient) {
            return res.status(400).send('Recipient not found');
        }

        const message = new Message({ from, to, content });
        await message.save();
        res.status(201).send('Message sent');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/messages', async (req, res) => {
    const { userId } = req.query;
    try {
        const messages = await Message.find({
            $or: [{ from: userId }, { to: userId }]
        }).populate('from to', 'username email');
        res.status(200).send(messages);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/chat', async (req, res) => {
    const { message } = req.body;
    try {
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/gpt2',
            { inputs: message },
            {
                headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` }
            }
        );
        res.send(response.data);
    } catch (error) {
        res.status(500).send(error.response ? error.response.data : error.message);
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
