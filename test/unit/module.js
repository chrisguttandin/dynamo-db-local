const rewire = require('rewire');
const sinon = require('sinon');

describe('dynamoDbLocal', function () {

    describe('spawn()', function () {

        let dynamoDbLocal;

        beforeEach(function () {
            dynamoDbLocal = rewire('../../src/module.js');

            dynamoDbLocal.__set__('__dirname', 'a fake directory name');
            dynamoDbLocal.__set__('spawn', sinon.stub());
        });

        it('should spawn the child process', function () {
            dynamoDbLocal.spawn();

            expect(dynamoDbLocal.__get__('spawn')).to.have.been.calledOnce;
            expect(dynamoDbLocal.__get__('spawn')).to.have.been.calledWithExactly('java', [
                '-Djava.library.path=../lib/dynamodb_local_2018-04-13/DynamoDBLocal_lib',
                '-jar',
                '../lib/dynamodb_local_2018-04-13/DynamoDBLocal.jar',
                '-inMemory'
            ], {
                cwd: 'a fake directory name'
            });
        });

        it('should spawn the child process on a custom port', function () {
            dynamoDbLocal.spawn(8001);

            expect(dynamoDbLocal.__get__('spawn')).to.have.been.calledOnce;
            expect(dynamoDbLocal.__get__('spawn')).to.have.been.calledWithExactly('java', [
                '-Djava.library.path=../lib/dynamodb_local_2018-04-13/DynamoDBLocal_lib',
                '-jar',
                '../lib/dynamodb_local_2018-04-13/DynamoDBLocal.jar',
                '-inMemory',
                '-port',
                '8001'
            ], {
                cwd: 'a fake directory name'
            });
        });

    });

});
