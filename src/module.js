const { spawn } = require('child_process');

module.exports.spawn = function ({ path = null, port = null, sharedDb = null } = { }) {
    const args = [
        '-Djava.library.path=../lib/dynamodb_local_2018-04-13/DynamoDBLocal_lib',
        '-jar',
        '../lib/dynamodb_local_2018-04-13/DynamoDBLocal.jar'
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
