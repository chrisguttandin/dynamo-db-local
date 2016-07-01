'use strict';

var rewire = require('rewire');

describe('dynamoDbLocal', function () {

    describe('spawn()', function () {

        var dynamoDbLocal;

        beforeEach(function () {
            dynamoDbLocal = rewire('../../src/module.js');

            dynamoDbLocal.__set__('__dirname', 'a fake directory name');
            dynamoDbLocal.__set__('spawn', sinon.stub());
        });

        it('should spawn the child process', function () {
            dynamoDbLocal.spawn();

            expect(dynamoDbLocal.__get__('spawn')).to.have.been.calledOnce;
            expect(dynamoDbLocal.__get__('spawn')).to.have.been.calledWithExactly('java', [
                '-Djava.library.path=../lib/dynamodb_local_2016-05-17/DynamoDBLocal_lib',
                '-jar',
                '../lib/dynamodb_local_2016-05-17/DynamoDBLocal.jar',
                '-inMemory'
            ], {
                cwd: 'a fake directory name'
            });
        });

    });

});
