var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var multer = require('multer');
var fs = require('fs');
var path = require('path')
var UUID = require('uuid')
var datetime=require('silly-datetime');


var storage = multer.diskStorage({  
    destination: function (req, file, cb) {  
        cb(null, 'static/public/uploads')  
    },  
    filename: function (req, file, cb) {  
        var str = file.originalname.split('.');  
        cb(null, UUID.v1()+'.'+str[1]);  
    }  
})
var upload = multer({storage: storage})

// 连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

var jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

var query = function( sql, values ) {
    // 返回一个 Promise
    return new Promise(( resolve, reject ) => {
      
        conn.query(sql, values, ( err, rows) => {
  
            if ( err ) {
              reject( err )
            } else {
              resolve( rows )
            }
            // 结束会话
            
          })    
    })
  }
// 增加用户接口
router.post('/addUser', (req, res) => {
    var params = req.body;
    conn.query("INSERT INTO user(username,password,super) VALUES(?,?,?)", [params.username, params.password, 1], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })

});

router.post('/login', (req, res) => {
    var params = req.body;
    conn.query("select * from user where username=?", [params.username], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            if (result.length == 0) {
                jsonWrite(res, {
                    code: -1,
                    msg: '用户名不存在！'
                });
            } else {
                if (result[0].password == params.password) {
                    jsonWrite(res, result);
                }
                else {
                    jsonWrite(res, {
                        code: -1,
                        msg: '密码不正确！'
                    });
                }
            }
        }
    })
});



module.exports = router;
