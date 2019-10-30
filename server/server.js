const express = require('express');
const path = require('path');
const helmet = require('helmet');

const app = express();

// prevent no-sniff header
app.use(helmet.noSniff());

const port = process.env.PORT || 8999;

app.use('/dist', express.static(path.resolve(__dirname, '../dist')));

// catch-all
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});


app.listen(port, () => {
  console.log('Server started and listening on port', port);
});

module.exports = app;
