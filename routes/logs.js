const express = require('express');
const multer = require('multer');
const fs = require('fs').promises;
const { parseLogFile } = require('../utils/parser');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

let logs = [];

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const filePath = req.file.path;
        const fileContent = await fs.readFile(filePath, 'utf-8');
        logs = parseLogFile(fileContent);
        // Remove the uploaded file from the server after parsing it into memory
        await fs.unlink(filePath);
        res.json({ message: 'File uploaded and parsed successfully', count: logs.length });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to upload/parse file' });
    }
});

router.get('/', (req, res) => {
    const { vehicle, code, from, to } = req.query;

    let filtered = [...logs];

    if (vehicle) filtered = filtered.filter(log => log.vehicleId === vehicle);
    if (code) filtered = filtered.filter(log => log.code === code);
    if (from) filtered = filtered.filter(log => new Date(log.timestamp) >= new Date(from));
    if (to) filtered = filtered.filter(log => new Date(log.timestamp) <= new Date(to));

    res.json(filtered);
});

module.exports = router;