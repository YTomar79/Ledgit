const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/bookmarkd', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use('/api/users', userRouter);
app.use('/api/reviews', reviewRouter);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
