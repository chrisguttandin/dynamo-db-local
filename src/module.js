const { spawn } = require('child_process');

module.exports.spawn = function ({ path = null, port = null, sharedDb = false } = {}) {
    const args = [
        '-Djava.library.path=../lib/dynamodb_local_2021-02-08/DynamoDBLocal_lib',
        '-jar',
        '../lib/dynamodb_local_2021-02-08/DynamoDBLocal.jar'
    ];

    if (path === null) {
        args.push('-inMemory');
    } else {
        args.push('-dbPath', path);
    }

    if (port !== null) {
        args.push('-port', port.toString());
    }

    if (sharedDb) {
        args.push('-sharedDb');
    }

    return spawn('java', args, {
        cwd: __dirname
    });
};
