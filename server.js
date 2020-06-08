const express = require('express');

const app = express();

app.use(express.static('./dist/serena-web'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/serena-web/'}),
);

app.listen(process.env.PORT || 8080);