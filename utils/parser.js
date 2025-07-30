function parseLogFile(content) {
    const lines = content.split('\n').filter(Boolean);
    const parsedLogs = [];

    for (const line of lines) {

        const cleanedLine = line.slice(1, -1);

        const parts = cleanedLine.split('] [');
        if (parts.length === 5) {
            const [timestamp, vehicleIdPart, level, codePart, description] = parts;

            const vehicleId = vehicleIdPart.split(':')[1];
            const code = codePart.split(':')[1];

            parsedLogs.push({
                timestamp,
                vehicleId,
                level,
                code,
                description
            });
        }
    }

    return parsedLogs;
}

module.exports = { parseLogFile };
