var serve = require("./"),
    koa = require('koa');
var app = koa();
app.use(serve('./example', 'test'));

app.listen(3000);

