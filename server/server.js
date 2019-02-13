const express = require("express");

let app = express();
let port = process.env.PORT || 3000;

app.all('/', (req, res) => {
    res.sendFile('index.html', {
        root: path.join(__dirname, './src')
    });
});

app.listen(port, () => {
    console.log("Server started and listening on port", port)
});