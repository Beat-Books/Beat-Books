const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('music router is working');
  res.status(200).end();
})


module.exports = router;