const dynamoDbLocal = require('../../src/module.js');

describe('dynamoDbLocal', function () {
    describe('spawn()/kill()', function () {
        it('should spawn and kill an instance of DynamoDB Local', function () {
            const dynamoDbLocalProcess = dynamoDbLocal.spawn();

            dynamoDbLocalProcess.kill();
        });
    });
});
