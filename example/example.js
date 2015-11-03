var serve = require("../"),
    koa = require('koa');
var app = koa();

app.use(serve('./example', 'test', { index: 'root.html' }));  // Path of folder, path you want to serve under.

app.use(function *(next) {
    if (this.path == '/') {
        this.body = "Try accessing '/test/1/test.html', '/test/2/test.txt', or '/test/3/test.json'";
    }
});

app.listen(3000);

