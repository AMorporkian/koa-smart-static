var send = require('koa-send'),
    fs = require('fs'),
    path = require('path');

function serve(root, servePath) {
    if(!root) throw Error('Root must be defined.');
    if(typeof root !== 'string') throw TypeError('Path must be a defined string.');

    var rootPath = path.normalize(root);
    var rootDirectory = path.resolve(rootPath);

    var rootStat = fs.statSync(rootDirectory);
    if(!rootStat.isDirectory()) throw Error('Root should be a directory.');
    if(!fs.realpathSync(root)) throw Error('Root must be a valid path.');

    var finalFiles = walk(root, null, root);

    if (typeof servePath === 'undefined') {
        servePath = root;
    }

    return function * staticFolder(next){
        var convertedPath = this.path.slice(1).split("/");
        if (convertedPath[0] == servePath) {

            var file = finalFiles[convertedPath.slice(1).join('/')];

            if (file) {
                return yield send(this, file, {root: __dirname});
            }
        }

        yield * next;
    }
}

function walk(directory, finalFiles, root) {
    finalFiles = finalFiles || [];
    var files = fs.readdirSync(directory);
    for(var i=0; i<files.length; i++) {
        var file = files[i];
        if(!file) continue;
        file = path.join(directory, file);
        if(fs.statSync(file).isDirectory()) {
            walk(file, finalFiles, root);
        }
        else {
            finalFiles[path.relative(root, file)] = file;
        }
    }
    return finalFiles;
}

module.exports = serve;