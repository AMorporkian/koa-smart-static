Middleware for Koa to serve a folder (and any subsequent subfolders/files) under a name declared by the user.

Syntax: `app.use(serve(relativePath, nameToServeUnder))`

## Example
```
var serve = require("./"),
    koa = require('koa');
var app = koa();

app.use(serve('./example', 'test'));  // Path of folder, path you want to serve under.

app.use(function *(next) {
    if (this.path == '/') {
        this.body = "Try accessing '/test/1/test.html', '/test/2/test.txt', or '/test/3/test.json'";
    }
});

app.listen(3000);
```

See example.js for this code in action with some dummy data.