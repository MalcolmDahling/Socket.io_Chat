const express = require('express');
const app = require('../app');
const router = express.Router({ mergeParams : true });
const path = require('path');



router.get('/', function(req, res) {
    res.sendFile(path.resolve('public/chat.html'));
});



module.exports = router;
