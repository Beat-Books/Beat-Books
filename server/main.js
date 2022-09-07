const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());

// NOTE: for testing purposes
app.get('/', (req, res) => {
  res.status(200).end();
})

app.listen(PORT, (req, res) => {
    console.log("Yay, express server is running on PORT 3000")
  })

module.exports = app;