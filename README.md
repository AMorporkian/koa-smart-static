Middleware for Koa to server a folder (and any subsequent subfolders/files) under a name declared by the user.

## Example
```
var serve = require("./"),
    koa = require('koa');
var app = koa();
app.use(serve('./example', 'test'));

app.listen(3000);
```

See example.js for this code in action with some dummy data.