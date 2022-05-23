const express = require('express');
const app = express();

const fs = require('fs');
const util = require('util');
fs.readFileAsync = util.promisify(fs.readFile);

const PORT = 19999;

app.get('/api/load-data', (_req, res) => {
    Promise.all([
        fs.readFileAsync('data/initial.tsv'),
        fs.readFileAsync('data/dimensions.tsv'),
        fs.readFileAsync('data/translations.tsv'),
    ]).then(data => {
        const firstRowInitial = data[0].toString().split('\n')[0];
        const initialItems = firstRowInitial.split("\t");
        const initial = {
            y: parseFloat(initialItems[0]),
            theta: parseFloat(initialItems[1]),
        };

        const firstRowDims = data[1].toString().split('\n')[0];
        const dimItems = firstRowDims.split("\t");
        const dimensions = {
            cm: parseFloat(dimItems[0]),
            base: parseFloat(dimItems[1]),
            height: parseFloat(dimItems[2]),
        };

        const translations = [];
        for (const row of data[2].toString().split('\n')) {
            const items = row.split("\t");

            let y;
            let theta;
            try {
                y = parseFloat(items[0]);
                theta = parseFloat(items[1]);
            } catch (_e) {
                continue;
            }

            translations.push({
                y: y,
                theta: theta,
            });
        }

        res.json({
            data: translations,
            dimensions: dimensions,
            initial: initial,
        });
    });
});

app.use(express.static('public'));
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
