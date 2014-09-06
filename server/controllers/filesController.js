var fs = require('fs'),
    Q = require('q'),
    path = require('path');

var sourceDataFileName = 'chartSource.js';

module.exports = {
    readFile: function(path) {
        var deferred = Q.defer();

        fs.readFile(path, 'utf8', function(err, data) {
            if (err) {
                console.log('Error: ' + err);
                deferred.reject(err);
                return;
            }

            deferred.resolve(data);
        })

        return deferred.promise;
    },
    deleteFile: function(path) {
        var deferred = Q.defer();

        fs.unlink(path, function(err) {
            if (err) {
                console.log('Error: ' + err);
                deferred.reject(err);
                return;
            }

            deferred.resolve();
        })

        return deferred.promise;
    },
    writeFile: function(path, data) {
        var deferred = Q.defer();

        fs.writeFile(path, data, function(err) {
            if (err) {
                console.log('Error: ' + err);
                deferred.reject(err);
                return;
            }

            deferred.resolve();
        })

        return deferred.promise;
    },
    jsonParse: function(data) {
        var deferred = Q.defer();

        try {
            data = JSON.parse(data);
            deferred.resolve(data);
        } catch (err) {
            deferred.reject(err);
        }

        return deferred.promise;
    },
    getFilePath: function(fileName) {
        return path.normalize(__dirname + "/../data/" + fileName);
    },
    getDataCachedFilePath: function() {
        return path.normalize(__dirname + "/../data/" + sourceDataFileName);
    },
    downloadDataCachedFile: function(req, res, next) {
        var file = path.normalize(__dirname + "/../data/" + sourceDataFileName);
       
        res.download(file, 'data.txt');               
    }
}