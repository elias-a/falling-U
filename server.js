const fs = require('fs');
const express = require('express');
const app = express();

const PORT = 19999;

app.get('/api/load-data', (_req, res) => {
    fs.readFile('data/out.tsv', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        const state = [];
        for (const row of data.toString().split('\n')) {
            const items = row.split("\t");

            let y;
            let theta;
            try {
                y = parseFloat(items[0]);
                theta = parseFloat(items[1]);
            } catch (_e) {
                continue;
            }

            state.push({
                y: y,
                theta: theta,
            });
        }

        res.json({ data: state });
    });
});

app.use(express.static('public'));
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
