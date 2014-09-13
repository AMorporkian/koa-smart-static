var send = require('koa-send'),
    fs = require('fs'),
    path = require('path'),
    thunkify = require('thunkify');

var exists = thunkify(fs.exists);

function serve(root, servePath) {
    return function * staticFolder(next){
        var convertedPath = this.path.slice(1).split("/");

        if (convertedPath[0] == servePath) {
            try {
                return yield send(this, convertedPath.slice(1).join('/'), {root: root});
            } catch (err) {
                yield * next;
            }
        }
    }
}


module.exports = serve;