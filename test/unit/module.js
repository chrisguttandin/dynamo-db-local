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
                '-Djava.library.path=../lib/dynamodb_local_2017-05-17/DynamoDBLocal_lib',
                '-jar',
                '../lib/dynamodb_local_2017-05-17/DynamoDBLocal.jar',
                '-inMemory'
            ], {
                cwd: 'a fake directory name'
            });
        });

    });

});
