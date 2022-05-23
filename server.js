const express = require('express');
const app = express();

const fs = require('fs');
const util = require('util');
fs.readFileAsync = util.promisify(fs.readFile);

const PORT = 19999;

app.get('/api/load-data', (_req, res) => {
    Promise.all([
        fs.readFileAsync('data/dimensions.tsv'),
        fs.readFileAsync('data/out.tsv'),
    ]).then(data => {
        const firstRow = data[0].toString().split('\n')[0];
        const items = firstRow.split("\t");
        const dimensions = {
            cm: parseFloat(items[0]),
            base: parseFloat(items[1]),
            height: parseFloat(items[2]),
        };

        const state = [];
        for (const row of data[1].toString().split('\n')) {
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

        res.json({ data: state, dimensions: dimensions });
    });
});

app.use(express.static('public'));
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
