// The following require statements use let because they need to be reassigned for testing.
let spawn = require('child_process').spawn; // eslint-disable-line prefer-const

module.exports.spawn = function () {
    return spawn('java', [
        '-Djava.library.path=../lib/dynamodb_local_2017-01-24/DynamoDBLocal_lib',
        '-jar',
        '../lib/dynamodb_local_2017-01-24/DynamoDBLocal.jar',
        '-inMemory'
    ], {
        cwd: __dirname
    });
};
