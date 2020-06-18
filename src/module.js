const { spawn } = require('child_process');

module.exports.spawn = function ({ path = null, port = null, sharedDb = false } = {}) {
    const args = [
        '-Djava.library.path=../lib/dynamodb_local_2020-05-29/DynamoDBLocal_lib',
        '-jar',
        '../lib/dynamodb_local_2020-05-29/DynamoDBLocal.jar'
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
