const express = require('express');
const http = require('http');
const path = require('path');
const compression = require('compression');

const app = express();

app.use(compression());

app.use(express.static(path.join(__dirname, 'dist/angular-project')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/angular-project/index.html'));
});

const port = process.env.PORT || 4000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log("running"));