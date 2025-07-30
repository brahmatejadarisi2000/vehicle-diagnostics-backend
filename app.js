// app.js
const express = require('express');
const cors = require('cors');
const logsRouter = require('./routes/logs');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/api/logs', logsRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
