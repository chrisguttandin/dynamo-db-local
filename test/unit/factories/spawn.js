import { createSpawn } from '../../../src/factories/spawn';
import { join } from 'path';
import { readFile } from 'fs/promises';
import { stub } from 'sinon';

describe('spawn()', function () {
    let childProcessSpwan;
    let cwd;
    let date;
    let spawn;
    let version;

    before(async () => {
        date = '2026-01-07';

        const readme = await readFile(join(__dirname, `../../../lib/dynamodb_local_${date}/README.txt`), { encoding: 'utf-8' });

        version = readme
            .split(/\n/)
            .map((line) => line.trim())
            .find((line) => /\d{4}-\d{2}-\d{2} \(\d+.\d+.\d+\)/.test(line))
            .slice(12, -1);
    });

    beforeEach(() => {
        childProcessSpwan = stub();
        cwd = 'a fake directory name';

        spawn = createSpawn(cwd, childProcessSpwan);
    });

    describe('with the docker command', () => {
        it('should spawn the child process', function () {
            spawn({ command: 'docker' });

            expect(childProcessSpwan).to.have.been.calledOnce;
            expect(childProcessSpwan).to.have.been.calledWithExactly(
                'docker',
                ['run', '--publish', '8000:8000', '--rm', `amazon/dynamodb-local:${version}`, '-jar', 'DynamoDBLocal.jar', '-inMemory'],
                {
                    cwd,
                    detached: false,
                    stdio: 'pipe'
                }
            );
        });

        it('should spawn the child process with the detached flag', () => {
            spawn({ command: 'docker', detached: true });

            expect(childProcessSpwan).to.have.been.calledOnce;
            expect(childProcessSpwan).to.have.been.calledWithExactly(
                'docker',
                ['run', '--publish', '8000:8000', '--rm', `amazon/dynamodb-local:${version}`, '-jar', 'DynamoDBLocal.jar', '-inMemory'],
                {
                    cwd,
                    detached: true,
                    stdio: 'pipe'
                }
            );
        });

        it('should spawn the child process with an explicit name', () => {
            spawn({ command: 'docker', name: 'a-fake-name' });

            expect(childProcessSpwan).to.have.been.calledOnce;
            expect(childProcessSpwan).to.have.been.calledWithExactly(
                'docker',
                [
                    'run',
                    '--name',
                    'a-fake-name',
                    '--publish',
                    '8000:8000',
                    '--rm',
                    `amazon/dynamodb-local:${version}`,
                    '-jar',
                    'DynamoDBLocal.jar',
                    '-inMemory'
                ],
                {
                    cwd,
                    detached: false,
                    stdio: 'pipe'
                }
            );
        });

        it('should spawn the child process with a custom path', () => {
            spawn({ command: 'docker', path: 'a/fake/path' });

            expect(childProcessSpwan).to.have.been.calledOnce;
            expect(childProcessSpwan).to.have.been.calledWithExactly(
                'docker',
                [
                    'run',
                    '--mount',
                    `source=a/fake/path,target=/home/dynamodblocal/db,type=bind`,
                    '--publish',
                    '8000:8000',
                    '--rm',
                    `amazon/dynamodb-local:${version}`,
                    '-jar',
                    'DynamoDBLocal.jar',
                    '-dbPath',
                    '/home/dynamodblocal/db'
                ],
                {
                    cwd,
                    detached: false,
                    stdio: 'pipe'
                }
            );
        });

        it('should spawn the child process on a custom port', () => {
            spawn({ command: 'docker', port: 8001 });

            expect(childProcessSpwan).to.have.been.calledOnce;
            expect(childProcessSpwan).to.have.been.calledWithExactly(
                'docker',
                ['run', '--publish', '8001:8000', '--rm', `amazon/dynamodb-local:${version}`, '-jar', 'DynamoDBLocal.jar', '-inMemory'],
                {
                    cwd,
                    detached: false,
                    stdio: 'pipe'
                }
            );
        });

        it('should spawn the child process with the sharedDb flag', () => {
            spawn({ command: 'docker', sharedDb: true });

            expect(childProcessSpwan).to.have.been.calledOnce;
            expect(childProcessSpwan).to.have.been.calledWithExactly(
                'docker',
                [
                    'run',
                    '--publish',
                    '8000:8000',
                    '--rm',
                    `amazon/dynamodb-local:${version}`,
                    '-jar',
                    'DynamoDBLocal.jar',
                    '-inMemory',
                    '-sharedDb'
                ],
                {
                    cwd,
                    detached: false,
                    stdio: 'pipe'
                }
            );
        });

        it('should spawn the child process with the specified stdio configuration', () => {
            spawn({ command: 'docker', stdio: 'inherit' });

            expect(childProcessSpwan).to.have.been.calledOnce;
            expect(childProcessSpwan).to.have.been.calledWithExactly(
                'docker',
                ['run', '--publish', '8000:8000', '--rm', `amazon/dynamodb-local:${version}`, '-jar', 'DynamoDBLocal.jar', '-inMemory'],
                {
                    cwd,
                    detached: false,
                    stdio: 'inherit'
                }
            );
        });
    });

    describe('with the java command', () => {
        it('should spawn the child process', () => {
            spawn();

            expect(childProcessSpwan).to.have.been.calledOnce;
            expect(childProcessSpwan).to.have.been.calledWithExactly(
                'java',
                [
                    `-Djava.library.path=../../lib/dynamodb_local_${date}/DynamoDBLocal_lib`,
                    '-jar',
                    `../../lib/dynamodb_local_${date}/DynamoDBLocal.jar`,
                    '-inMemory'
                ],
                {
                    cwd,
                    detached: false,
                    stdio: 'pipe'
                }
            );
        });

        it('should spawn the child process with the detached flag', () => {
            spawn({ detached: true });

            expect(childProcessSpwan).to.have.been.calledOnce;
            expect(childProcessSpwan).to.have.been.calledWithExactly(
                'java',
                [
                    `-Djava.library.path=../../lib/dynamodb_local_${date}/DynamoDBLocal_lib`,
                    '-jar',
                    `../../lib/dynamodb_local_${date}/DynamoDBLocal.jar`,
                    '-inMemory'
                ],
                {
                    cwd,
                    detached: true,
                    stdio: 'pipe'
                }
            );
        });

        it('should spawn the child process with an explicit name', () => {
            spawn();

            expect(childProcessSpwan).to.have.been.calledOnce;
            expect(childProcessSpwan).to.have.been.calledWithExactly(
                'java',
                [
                    `-Djava.library.path=../../lib/dynamodb_local_${date}/DynamoDBLocal_lib`,
                    '-jar',
                    `../../lib/dynamodb_local_${date}/DynamoDBLocal.jar`,
                    '-inMemory'
                ],
                {
                    cwd,
                    detached: false,
                    stdio: 'pipe'
                }
            );
        });

        it('should spawn the child process with a custom path', () => {
            spawn({ path: 'a/fake/path' });

            expect(childProcessSpwan).to.have.been.calledOnce;
            expect(childProcessSpwan).to.have.been.calledWithExactly(
                'java',
                [
                    `-Djava.library.path=../../lib/dynamodb_local_${date}/DynamoDBLocal_lib`,
                    '-jar',
                    `../../lib/dynamodb_local_${date}/DynamoDBLocal.jar`,
                    '-dbPath',
                    'a/fake/path'
                ],
                {
                    cwd,
                    detached: false,
                    stdio: 'pipe'
                }
            );
        });

        it('should spawn the child process on a custom port', () => {
            spawn({ port: 8001 });

            expect(childProcessSpwan).to.have.been.calledOnce;
            expect(childProcessSpwan).to.have.been.calledWithExactly(
                'java',
                [
                    `-Djava.library.path=../../lib/dynamodb_local_${date}/DynamoDBLocal_lib`,
                    '-jar',
                    `../../lib/dynamodb_local_${date}/DynamoDBLocal.jar`,
                    '-inMemory',
                    '-port',
                    '8001'
                ],
                {
                    cwd,
                    detached: false,
                    stdio: 'pipe'
                }
            );
        });

        it('should spawn the child process with the sharedDb flag', () => {
            spawn({ sharedDb: true });

            expect(childProcessSpwan).to.have.been.calledOnce;
            expect(childProcessSpwan).to.have.been.calledWithExactly(
                'java',
                [
                    `-Djava.library.path=../../lib/dynamodb_local_${date}/DynamoDBLocal_lib`,
                    '-jar',
                    `../../lib/dynamodb_local_${date}/DynamoDBLocal.jar`,
                    '-inMemory',
                    '-sharedDb'
                ],
                {
                    cwd,
                    detached: false,
                    stdio: 'pipe'
                }
            );
        });

        it('should spawn the child process with the specified stdio configuration', () => {
            spawn({ stdio: 'inherit' });

            expect(childProcessSpwan).to.have.been.calledOnce;
            expect(childProcessSpwan).to.have.been.calledWithExactly(
                'java',
                [
                    `-Djava.library.path=../../lib/dynamodb_local_${date}/DynamoDBLocal_lib`,
                    '-jar',
                    `../../lib/dynamodb_local_${date}/DynamoDBLocal.jar`,
                    '-inMemory'
                ],
                {
                    cwd,
                    detached: false,
                    stdio: 'inherit'
                }
            );
        });
    });
});
