'use strict';

var spawn = require('child_process').spawn;

module.exports.spawn = function () {
    return spawn('java', [
        '-Djava.library.path=../lib/dynamodb_local_2016-03-01/DynamoDBLocal_lib',
        '-jar',
        '../lib/dynamodb_local_2016-03-01/DynamoDBLocal.jar',
        '-inMemory'
    ], {
        cwd: __dirname
    });
};
