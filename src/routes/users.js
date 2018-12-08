var express = require('express');
var router = express.Router();
var query = require('../mysql/query');
var sql = require('../mysql/sql');
/* GET users listing. */
router.get('/', function(req, res, next) {
    query(sql.SELECT_ALL, function(err, result) {
        if (err) {
            res.json({ code: 0, msg: err });
        } else {
            res.json({ code: 1, msg: '查找成功', data: result });
        }
    })
});

module.exports = router;