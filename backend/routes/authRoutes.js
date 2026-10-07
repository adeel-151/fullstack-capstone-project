const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey123';

// Register User
router.post('/api/auth/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ error: "Missing credentials" });
        
        const db = await connectToDatabase();
        const existingUser = await db.collection("users").findOne({ username });
        if (existingUser) return res.status(400).json({ error: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.collection("users").insertOne({ username, password: hashedPassword });
        
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Registration failed" });
    }
});

// Login User
router.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const db = await connectToDatabase();
        
        // locate the current user in the database
        const user = await db.collection("users").findOne({ username });
        
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign({ username: user.username, id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
});

module.exports = router;
