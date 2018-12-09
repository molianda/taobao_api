var express = require('express');
var router = express.Router();
var query = require('../mysql/query');
var sql = require('../mysql/sql');
/* GET users listing. */
router.get('/', function(req, res, next) {
    var pagenum = req.query.pagenum;
    var pagesize = req.query.pagesize;

    query(sql.SELECT_COUNT, function(err, result) {
        if (err) {
            res.json({ code: 0, msg: err });
        } else {
            var total = Math.ceil(result[0]['count(*)'] / pagesize);
            queryUserlist(total);
        }
    });

    function queryUserlist(total) {
        var start = (pagenum - 1) * pagesize;
        var sqlstr = `select * from taobaolist limit ${start},${pagesize}`;
        query(sqlstr, function(err, result) {
            if (err) {
                return res.json({ code: 0, msg: err });
            } else {
                res.json({ code: 1, data: result, total: total });
            }
        });
    }
});

module.exports = router;