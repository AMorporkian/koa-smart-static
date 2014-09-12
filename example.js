var serve = require("./"),
    koa = require('koa');
var app = koa();
console.log(serve);
app.use(serve('./example', 'test'));

app.listen(3000);

