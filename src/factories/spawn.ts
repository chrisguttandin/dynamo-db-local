import type { spawn as spawnFunction } from 'child_process';

export const createSpawn =
    (cwd: string, spawn: typeof spawnFunction) =>
    ({
        command = 'java',
        detached = false,
        name = null,
        path = null,
        port = null,
        sharedDb = false,
        stdio = 'pipe'
    }: Partial<{
        command: 'docker' | 'java';
        detached: boolean;
        name: null | string;
        path: null | string;
        port: null | number;
        sharedDb: boolean;
        stdio: 'ignore' | 'inherit' | 'pipe';
    }> = {}) => {
        const args =
            command === 'docker'
                ? ['run']
                : [
                      '-Djava.library.path=../lib/dynamodb_local_2024-03-14/DynamoDBLocal_lib',
                      '-jar',
                      '../lib/dynamodb_local_2024-03-14/DynamoDBLocal.jar'
                  ];

        if (command === 'docker') {
            if (path !== null) {
                args.push('--mount', `source=${path},target=/home/dynamodblocal/db,type=bind`);
            }

            if (name !== null) {
                args.push('--name', name);
            }

            args.push(
                '--publish',
                `${port === null ? '8000' : port.toString()}:8000`,
                '--rm',
                'amazon/dynamodb-local:2.3.0',
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
            cwd,
            detached,
            stdio
        });
    };
