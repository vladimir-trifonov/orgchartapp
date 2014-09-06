var mongoose = require('mongoose'),
    file = require('../controllers/filesController'),
    Q = require('q');

var nodeSchema = mongoose.Schema({
    name: String,
    text: String,
    type: String,
    classes: String,
    canCollapse: Boolean,
    children: []
});
var Node = mongoose.model('Node', nodeSchema);
module.exports.seedInitialNodes = function(resetData, filePath) {
    var inDef = Q.defer(),
        deferred = Q.defer(),
        fullPath;

    var cacheFilePath = file.getDataCachedFilePath();

    if (filePath) {
        fullPath = filePath;
    } else {
        fullPath = cacheFilePath;
    }

    Node.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find nodes: ' + err);
        }

        var jsonDataStr;
        var nodeDataJSON = file.readFile(fullPath).then(function(data) {
            jsonDataStr = data;
            return file.jsonParse(data);
        });
        nodeDataJSON.then(
            function(data) {
                if (typeof data === "undefined") {
                    deferred.reject(err);
                    return;
                }

                deferred.resolve(data);
            },
            function(err) {
                deferred.reject(err);
                return;
            });

        deferred.promise.then(function(data) {
            if (resetData) {                
                file.writeFile(cacheFilePath, jsonDataStr);

                Node.remove({}, function(err) {
                    if (err) {
                        console.log('Cannot delete nodes: ' + err);
                        inDef.reject();
                        return;
                    }

                    inDef.resolve();
                });
            } else {
                inDef.resolve();
            }

            inDef.promise.then(function() {
                if (collection.length === 0 || resetData) {
                    Node.create(data);
                }
            })
        })

    });

    return deferred.promise;
};