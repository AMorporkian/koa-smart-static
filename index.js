var send = require('koa-send'),
    fs = require('fs'),
    path = require('path');

function serve(root, servePath) {
    return function * staticFolder(next){
        var convertedPath = this.path.slice(1).split("/");

        if (convertedPath[0] == servePath) {
            try {
                var path = convertedPath.slice(1).join('/');
                //if path is empty string - we're going to the root
                if (path === '') {
                    path = '/';
                }

                return yield send(this, path, {root: root});

            } catch (err) {
            }
        }
        yield * next;
    }
}


module.exports = serve;
