# 基于Expres、mongoDB、Angular 制作的一个 CMS
此项目用于学习Expres、mongoDB、Angular技术,于2016年3月开始。
## 参照见网站


##1、安装NPM包
```shell
npm install express-session --save
npm install connect-mongo --save
```
##2、加载包
```javascript
var session=require("express-session");
var mongoStore = require('connect-mongo')(session);
```