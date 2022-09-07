const express = require('express');
const path = require('path');
const musicRouter = require('./routes/music');
const app = express();
const PORT = 3000;

app.use(express.json());

// NOTE: for testing purposes
app.get('/', (req, res) => {
  res.status(200).end();
})

app.use('/api/music', musicRouter);

/* changes default behavior to "find first avaible port" in testing. This allows
multiple tests to be run in paralell on different ports */
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, (req, res) => {
      console.log("Yay, express server is running on PORT 3000")
  })
}

module.exports = app;