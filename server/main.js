const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, (req, res) => {
    console.log("Yay, express server is running on PORT 3000")
  })

module.exports = app;