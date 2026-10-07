const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../db');

// Search items
router.get('/api/search', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const { category } = req.query;
        let query = {};
        
        // Code to filter results based on category
        if (category) {
            query.category = { $regex: new RegExp(category, 'i') }; // Case insensitive search
        }
        
        const results = await db.collection("gifts").find(query).toArray();
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: "Failed to search gifts" });
    }
});

module.exports = router;
