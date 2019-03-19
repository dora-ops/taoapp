var models = require('../db');
var express = require('express');
var router = express();


// var router = express.Router();
router.all('*', function(req, res, next) {
    const ori=req.get('Origin');
    if(!(ori!=undefined&&req.get('Origin').endsWith('8089'))){
        
    }
    res.header("Origin", "*");
    res.header("Access-Control-Allow-Credentials","true")
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    // res.header("X-Powered-By",' 3.2.1')
    // res.header("Content-Type", "application/json;charset=utf-8");
    res.header("Access-Control-Allow-Headers", "Content-Type,application/x-www-form-urlencoded");
    // res.setHeader("Access-Control-Allow-Headers", "x-requested-with,application/x-www-form-urlencoded");
    next();
});
var mysql = require('mysql');


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

var space=' '
var eq='='
router.post('/insert', (req, res) => {
    var p = req.body;
    var sql="INSERT INTO "+ p.table;
    var param=[]
    var d=p.data
    if (d!=undefined) {
        var property=' ('
        var val=' ('
        for (const key in d) {
            property=property+key+','
            val=val+'?,'
            if (d.hasOwnProperty(key)) {
                const element = d[key];
                param.push(element)
            }
        }
        property=property.substring(0,property.lastIndexOf(','))
        val=val.substring(0,val.lastIndexOf(','))
        property+=')'
        val+=')'
        sql=sql+propert+val
    }
    
   conn.query(sql, param, function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

router.post('/search', (req, res) => {
    var p = req.body;
    var sql="select * from "+ p.table;
    var param=[]
    var d=p.data
    if (d!=undefined) {
        var where=' where '
       
        for (const key in d) {
            where=where+' '+key+' like ? AND '
           
            if (d.hasOwnProperty(key)) {
                const element = d[key];
                param.push(element)
            }
        }
        where=where.substring(0,where.lastIndexOf('AND'))
        sql=sql+where
    }
    
   conn.query(sql, param, function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

router.post('/getAll', (req, res) => {
    var p = req.body;
    var sql="select * from "+ p.table;
    var param=[]
    var d=p.data
    
    
   conn.query(sql, param, function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            result=result.map(item=>{
               return JSON.parse(item.json) 
            })
            jsonWrite(res,result);
        }
    })
});


module.exports = router;
