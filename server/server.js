const express = require('express');
const path = require('path');
const helmet = require('helmet');

const app = express();

// prevent no-sniff header
app.use(helmet.noSniff());

const port = process.env.PORT || 8080;

app.all('/', (req, res) => {
  res.sendFile('index.html', {
    root: path.join(__dirname, '../public'),
  });
});

app.use('/dist', express.static(path.resolve(__dirname, '../dist')));

app.listen(port, () => {
  console.log('Server started and listening on port', port);
});

module.exports = app;
