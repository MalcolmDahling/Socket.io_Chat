const express = require('express');
const app = require('../app');
const router = express.Router({ mergeParams : true });
const path = require('path');



router.get('/', function(req, res) {
    res.sendFile(path.resolve('public/chat.html'));
    //console.log('User entered room: ' + req.params.room);
});



module.exports = router;
