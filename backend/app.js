const express = require('express');
const cors = require('cors');
const giftRoutes = require('./routes/giftRoutes');
const searchRoutes = require('./routes/searchRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use(giftRoutes);
app.use(searchRoutes);
app.use(authRoutes);

app.get('/', (req, res) => {
    res.send("Welcome to the Gifts App Backend!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
