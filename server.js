const express = require('express');
const path = require('path');
const db = require('./config/db');
const bcrypt = require('bcrypt');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = 'INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)';

        db.query(sql, [name, email, hashedPassword, role], (err) => {
            if (err) {
                return res.status(400).json({ message: 'Registration failed: ' + err.message });
            }

            res.json({ message: 'Registration Successful!' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});