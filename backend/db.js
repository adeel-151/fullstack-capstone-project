const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.MONGO_URL || "mongodb://localhost:27017";
const client = new MongoClient(url);

let dbConnection;

async function connectToDatabase() {
    if (dbConnection) {
        return dbConnection;
    }
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB");
        dbConnection = client.db("fullstack_capstone");
        return dbConnection;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

module.exports = { connectToDatabase };
