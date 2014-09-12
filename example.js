var serve = require("./"),
    koa = require('koa');
var app = koa();
app.use(serve('./example/1', 'test'));

app.listen(3000);

