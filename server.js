const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db/mongo.config.js');
const app = require('./src/app.js');

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
