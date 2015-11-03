var send = require('koa-send'),
    fs = require('fs'),
    path = require('path');

function serve(root, servePath, options) {
    options = options || {};
    return function * staticFolder(next){
        var convertedPath = this.path.slice(1).split("/");

        if (convertedPath[0] == servePath) {
            try {
                var path = convertedPath.slice(1).join('/');
                //if path is empty string - we're going to the root
                if (path === '') {
                    path = '/';
                }

                var opts = {
                    root: root,
                    index: options.index || 'index.html'
                };

                return yield send(this, path, opts);
            } catch (err) {
            }
        }
        yield * next;
    }
}


module.exports = serve;
