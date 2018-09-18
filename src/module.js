const { spawn } = require('child_process');

module.exports.spawn = function (port) {
    const args = [
        '-Djava.library.path=../lib/dynamodb_local_2018-04-13/DynamoDBLocal_lib',
        '-jar',
        '../lib/dynamodb_local_2018-04-13/DynamoDBLocal.jar',
        '-inMemory'
    ];

    if (typeof port === 'number' && port >= 0) {
        args.push('-port', port.toString());
    }

    return spawn('java', args, {
        cwd: __dirname
    });
};
