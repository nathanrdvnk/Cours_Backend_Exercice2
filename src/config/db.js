require('dotenv').config();
const mongoose = require('mongoose');
const { Client } = require('pg');

//MongoDB
async function connectMongoDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        const db = mongoose.connection;
        db.on('error', (err) => console.error(err));
        db.once('open', () => console.log('MongoDB Server Started'));
        return db;
    } catch (err) {
        console.error('Erreur MongoDB :', err.message);
        return null;
    }
}

//PostgreSQL
async function connectPostgreSQL() {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_URL,
    });
    try {
        await client.connect();
        return client;
    } catch (err) {
        console.error('Erreur PostgreSQL :', err.message);
        return null;
    }
}

module.exports = { connectMongoDB, connectPostgreSQL };
