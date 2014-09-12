var serve = require("./"),
    koa = require('koa');
var app = koa();
console.log(serve);
app.use(serve('./test', 'test7'));
app.listen(3000);

