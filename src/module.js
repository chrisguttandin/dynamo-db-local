const { spawn } = require('child_process');

module.exports.spawn = function ({ command = 'java', path = null, port = null, sharedDb = false, stdio = 'pipe' } = {}) {
    const args =
        command === 'docker'
            ? ['run']
            : [
                  '-Djava.library.path=../lib/dynamodb_local_2023-01-26/DynamoDBLocal_lib',
                  '-jar',
                  '../lib/dynamodb_local_2023-01-26/DynamoDBLocal.jar'
              ];

    if (command === 'docker') {
        if (path !== null) {
            args.push('--mount', `source=${path},target=/home/dynamodblocal/db,type=bind`);
        }

        args.push(
            '--publish',
            `${port === null ? '8000' : port.toString()}:8000`,
            '--rm',
            'amazon/dynamodb-local:1.21.0',
            '-jar',
            'DynamoDBLocal.jar'
        );

        if (path !== null) {
            args.push('-dbPath', '/home/dynamodblocal/db');
        }
    }

    if (path === null) {
        args.push('-inMemory');
    }

    if (command === 'java') {
        if (path !== null) {
            args.push('-dbPath', path);
        }

        if (port !== null) {
            args.push('-port', port.toString());
        }
    }

    if (sharedDb) {
        args.push('-sharedDb');
    }

    return spawn(command, args, {
        cwd: __dirname,
        stdio
    });
};
