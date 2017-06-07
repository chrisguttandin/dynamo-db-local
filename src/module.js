// The following require statements use let because they need to be reassigned for testing.
let spawn = require('child_process').spawn; // eslint-disable-line prefer-const

module.exports.spawn = function (port) {
    const args = [
        '-Djava.library.path=../lib/dynamodb_local_2017-05-17/DynamoDBLocal_lib',
        '-jar',
        '../lib/dynamodb_local_2017-05-17/DynamoDBLocal.jar',
        '-inMemory'
    ];

    if (typeof port === 'number' && port >= 0) {
        args.push('-port', port.toString());
    }

    return spawn('java', args, {
        cwd: __dirname
    });
};