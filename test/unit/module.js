const { readFile } = require('fs/promises');
const { join } = require('path');
const rewire = require('rewire');
const sinon = require('sinon');

describe('dynamoDbLocal', function () {
    let date;
    let version;

    before(async () => {
        date = '2024-01-04';

        const readme = await readFile(join(__dirname, `../../lib/dynamodb_local_${date}/README.txt`), { encoding: 'utf-8' });

        version = readme
            .split(/\n/)
            .find((line) => /\d{4}-\d{2}-\d{2} \(\d+.\d+.\d+\)/.test(line))
            .slice(12, -1);
    });

    describe('spawn()', function () {
        let dynamoDbLocal;

        beforeEach(function () {
            dynamoDbLocal = rewire('../../src/module.js');

            dynamoDbLocal.__set__('__dirname', 'a fake directory name');
            dynamoDbLocal.__set__('spawn', sinon.stub());
        });

        describe('with the docker command', () => {
            it('should spawn the child process', function () {
                dynamoDbLocal.spawn({ command: 'docker' });

                expect(dynamoDbLocal.__get__('spawn')).to.have.been.calledOnce;
                expect(dynamoDbLocal.__get__('spawn')).to.have.been.calledWithExactly(
                    'docker',
                    ['run', '--publish', '8000:8000', '--rm', `amazon/dynamodb-local:${version}`, '-jar', 'DynamoDBLocal.jar', '-inMemory'],
                    {
                        cwd: 'a fake directory name',
                        detached: false,
                        stdio: 'pipe'
                    }
                );
            });

            it('should spawn the child process with the detached flag', function () {
                dynamoDbLocal.spawn({ command: 'docker', detached: true });

                expect(dynamoDbLocal.__get__('spawn')).to.have.been.calledOnce;
                expect(dynamoDbLocal.__get__('spawn')).to.have.been.calledWithExactly(
                    'docker',
                    ['run', '--publish', '8000:8000', '--rm', `amazon/dynamodb-local:${version}`, '-jar', 'DynamoDBLocal.jar', '-inMemory'],
                    {
                        cwd: 'a fake directory name',
                        detached: true,
                        stdio: 'pipe'
                    }
                );
            });

            it('should spawn the child process with a custom path', function () {
                dynamoDbLocal.spawn({ command: 'docker', path: 'a/fake/path' });

                expect(dynamoDbLocal.__get__('spawn')).to.have.been.calledOnce;
                expect(dynamoDbLocal.__get__('spawn')).to.have.been.calledWithExactly(
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
                        cwd: 'a fake directory name',
                        detached: false,
                        stdio: 'pipe'
                    }
                );
            });

            it('should spawn the child process on a custom port', function () {
                dynamoDbLocal.spawn({ command: 'docker', port: 8001 });

                expect(dynamoDbLocal.__get__('spawn')).to.have.been.calledOnce;
                expect(dynamoDbLocal.__get__('spawn')).to.have.been.calledWithExactly(
                    'docker',
                    ['run', '--publish', '8001:8000', '--rm', `amazon/dynamodb-local:${version}`, '-jar', 'DynamoDBLocal.jar', '-inMemory'],
                    {
                        cwd: 'a fake directory name',
                        detached: false,
                        stdio: 'pipe'
                    }
                );
            });

            it('should spawn the child process with the sharedDb flag', function () {
                dynamoDbLocal.spawn({ command: 'docker', sharedDb: true });

                expect(dynamoDbLocal.__get__('spawn')).to.have.been.calledOnce;
                expect(dynamoDbLocal.__get__('spawn')).to.have.been.calledWithExactly(
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
                        cwd: 'a fake directory name',
                        detached: false,
                        stdio: 'pipe'
                    }
                );
            });

            it('should spawn the child process with the specified stdio configuration', function () {
                dynamoDbLocal.spawn({ command: 'docker', stdio: 'inherit' });

                expect(dynamoDbLocal.__get__('spawn')).to.have.been.calledOnce;
                expect(dynamoDbLocal.__get__('spawn')).to.have.been.calledWithExactly(
                    'docker',
                    ['run', '--publish', '8000:8000', '--rm', `amazon/dynamodb-local:${version}`, '-jar', 'DynamoDBLocal.jar', '-inMemory'],
                    {
                        cwd: 'a fake directory name',
                        detached: false,
                        stdio: 'inherit'
                    }
                );
            });
        });

        describe('with the java command', () => {
            it('should spawn the child process', function () {
                dynamoDbLocal.spawn();

                expect(dynamoDbLocal.__get__('spawn')).to.have.been.calledOnce;
                expect(dynamoDbLocal.__get__('spawn')).to.have.been.calledWithExactly(
                    'java',
                    [
                        `-Djava.library.path=../lib/dynamodb_local_${date}/DynamoDBLocal_lib`,
                        '-jar',
                        `../lib/dynamodb_local_${date}/DynamoDBLocal.jar`,
                        '-inMemory'
                    ],
                    {
                        cwd: 'a fake directory name',
                        detached: false,
                        stdio: 'pipe'
                    }
                );
            });

            it('should spawn the child process with the detached flag', function () {
                dynamoDbLocal.spawn({ detached: true });

                expect(dynamoDbLocal.__get__('spawn')).to.have.been.calledOnce;
                expect(dynamoDbLocal.__get__('spawn')).to.have.been.calledWithExactly(
                    'java',
                    [
                        `-Djava.library.path=../lib/dynamodb_local_${date}/DynamoDBLocal_lib`,
                        '-jar',
                        `../lib/dynamodb_local_${date}/DynamoDBLocal.jar`,
                        '-inMemory'
                    ],
                    {
                        cwd: 'a fake directory name',
                        detached: true,
                        stdio: 'pipe'
                    }
                );
            });

            it('should spawn the child process with a custom path', function () {
                dynamoDbLocal.spawn({ path: 'a/fake/path' });

                expect(dynamoDbLocal.__get__('spawn')).to.have.been.calledOnce;
                expect(dynamoDbLocal.__get__('spawn')).to.have.been.calledWithExactly(
                    'java',
                    [
                        `-Djava.library.path=../lib/dynamodb_local_${date}/DynamoDBLocal_lib`,
                        '-jar',
                        `../lib/dynamodb_local_${date}/DynamoDBLocal.jar`,
                        '-dbPath',
                        'a/fake/path'
                    ],
                    {
                        cwd: 'a fake directory name',
                        detached: false,
                        stdio: 'pipe'
                    }
                );
            });

            it('should spawn the child process on a custom port', function () {
                dynamoDbLocal.spawn({ port: 8001 });

                expect(dynamoDbLocal.__get__('spawn')).to.have.been.calledOnce;
                expect(dynamoDbLocal.__get__('spawn')).to.have.been.calledWithExactly(
                    'java',
                    [
                        `-Djava.library.path=../lib/dynamodb_local_${date}/DynamoDBLocal_lib`,
                        '-jar',
                        `../lib/dynamodb_local_${date}/DynamoDBLocal.jar`,
                        '-inMemory',
                        '-port',
                        '8001'
                    ],
                    {
                        cwd: 'a fake directory name',
                        detached: false,
                        stdio: 'pipe'
                    }
                );
            });

            it('should spawn the child process with the sharedDb flag', function () {
                dynamoDbLocal.spawn({ sharedDb: true });

                expect(dynamoDbLocal.__get__('spawn')).to.have.been.calledOnce;
                expect(dynamoDbLocal.__get__('spawn')).to.have.been.calledWithExactly(
                    'java',
                    [
                        `-Djava.library.path=../lib/dynamodb_local_${date}/DynamoDBLocal_lib`,
                        '-jar',
                        `../lib/dynamodb_local_${date}/DynamoDBLocal.jar`,
                        '-inMemory',
                        '-sharedDb'
                    ],
                    {
                        cwd: 'a fake directory name',
                        detached: false,
                        stdio: 'pipe'
                    }
                );
            });

            it('should spawn the child process with the specified stdio configuration', function () {
                dynamoDbLocal.spawn({ stdio: 'inherit' });

                expect(dynamoDbLocal.__get__('spawn')).to.have.been.calledOnce;
                expect(dynamoDbLocal.__get__('spawn')).to.have.been.calledWithExactly(
                    'java',
                    [
                        `-Djava.library.path=../lib/dynamodb_local_${date}/DynamoDBLocal_lib`,
                        '-jar',
                        `../lib/dynamodb_local_${date}/DynamoDBLocal.jar`,
                        '-inMemory'
                    ],
                    {
                        cwd: 'a fake directory name',
                        detached: false,
                        stdio: 'inherit'
                    }
                );
            });
        });
    });
});
