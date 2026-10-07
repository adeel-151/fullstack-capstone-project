const { MongoClient } = require('mongodb');
const gifts = require('./data/gifts.json');

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

async function run() {
    try {
        await client.connect();
        console.log("Connected successfully to server");
        const db = client.db("fullstack_capstone");
        
        // Clear existing to avoid duplicates
        await db.collection("gifts").deleteMany({});
        await db.collection("users").deleteMany({});
        
        const result = await db.collection("gifts").insertMany(gifts);
        console.log(`inserted_items: Imported ${result.insertedCount} documents into MongoDB.`);
    } finally {
        await client.close();
    }
}
run().catch(console.dir);
