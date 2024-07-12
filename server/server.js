const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const mysql = require('mysql');

const app = express();
const PORT = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'book_community'
});

db.connect(err => {
    if (err) throw err;
    console.log('Database connected...');
});

app.use(bodyParser.json());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';

    db.query(query, [email], async (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            const user = results[0];
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                req.session.userId = user.id;
                res.sendStatus(200);
            } else {
                res.sendStatus(401);
            }
        } else {
            res.sendStatus(401);
        }
    });
});

app.post('/signup', async (req, res) => {
    const { email, password, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (email, password, username) VALUES (?, ?, ?)';

    db.query(query, [email, hashedPassword, username], (err, results) => {
        if (err) throw err;
        res.sendStatus(201);
    });
});

// Endpoint to submit reviews
app.post('/submit-review', (req, res) => {
    const { userId, bookId, review } = req.body;
    const points = 5;
    const query = 'INSERT INTO reviews (user_id, book_id, review, points) VALUES (?, ?, ?, ?)';

    db.query(query, [userId, bookId, review, points], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Review submitted successfully!' });
    });
});

// Endpoint to get all reviews
app.get('/get-reviews', (req, res) => {
    const reviewsQuery = 'SELECT * FROM reviews ORDER BY id DESC';
    db.query(reviewsQuery, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
