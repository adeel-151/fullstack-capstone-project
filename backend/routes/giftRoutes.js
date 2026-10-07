const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../db');
const { ObjectId } = require('mongodb');

// Get all gifts
router.get('/api/gifts', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const gifts = await db.collection("gifts").find({}).toArray();
        res.status(200).json(gifts);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch gifts" });
    }
});

// Get a single gift by id
router.get('/api/gifts/:id', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const id = req.params.id;
        let query = {};
        if (ObjectId.isValid(id)) {
            query = { _id: new ObjectId(id) };
        } else {
            query = { id: parseInt(id) }; // Fallback for integer ids if used in seed
        }
        const gift = await db.collection("gifts").findOne(query);
        if (gift) {
            res.status(200).json(gift);
        } else {
            res.status(404).json({ error: "Gift not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch the gift" });
    }
});

module.exports = router;
