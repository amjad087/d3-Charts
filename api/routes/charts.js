const express = require('express');
const router = express.Router();
var fs = require('fs');


/* GET home page. */
router.get('/', (req, res, next) => {

  fs.readFile('public/complete.json', 'utf8', (err, data) => {
    if (err) {

      res.status(500).json({
        message: 'Could not get charts data!'
      })

    }
    const obj = JSON.parse(data);
    res.status(200).json({
      message: 'Posts fecthed successfully!',
      data: obj,
    });

  });
});

module.exports = router;
