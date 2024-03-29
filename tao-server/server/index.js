const userApi = require('./api/userApi');

const baseApi = require('./api/baseApi');

const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 后端api路由
app.use('/api/user', userApi);
app.use('/api/base', baseApi);

// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');