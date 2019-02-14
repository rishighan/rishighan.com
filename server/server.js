const express = require("express");
const path = require("path");
const helmet = require("helmet");

let app = express();
app.use(helmet.noSniff());

let port = process.env.PORT || 3000;

app.all('/', (req, res) => {
    res.sendFile('index.html', {
        root: path.join(__dirname, '../public')
    });
});

app.use('/dist', express.static(path.resolve(__dirname, '../dist')))

app.listen(port, () => {
    console.log("Server started and listening on port", port)
});

module.exports = app;