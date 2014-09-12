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

    var finalFiles = walk(root);

    if (!servePath) {
        servePath = root;
    }

    return function * staticFolder(next){
        console.log(servePath);
        var convertedPath = this.path.slice(1).split("/");
        if (convertedPath[0] == servePath) {
            var file = finalFiles[convertedPath.slice(1).join('/')];
            console.log(file);
            console.log(convertedPath.slice(1).join('/'));
            console.log(__dirname);
            if (file) {
                return yield send(this, file, {root: __dirname});
            }
        }

        console.log(finalFiles);
        console.log(finalPath);
        yield * next;
    }
}

function walk(directory, finalFiles) {
    finalFiles = finalFiles || [];
    var files = fs.readdirSync(directory);
    for(var i=0; i<files.length; i++) {
        var file = files[i];
        if(!file) continue;
        file = path.join(directory, file);
        if(fs.statSync(file).isDirectory()) {
            walk(file, finalFiles);
        }
        else {
            finalFiles[path.join.apply(this, file.split(path.sep).slice(1))] = file;
        }
    }
    return finalFiles;
}

module.exports = serve;