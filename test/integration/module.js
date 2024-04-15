import { spawn } from '../../src/module';

describe('dynamoDbLocal', function () {
    describe('spawn()/kill()', function () {
        it('should spawn and kill an instance of DynamoDB Local', function () {
            const dynamoDbLocalProcess = spawn();

            dynamoDbLocalProcess.kill();
        });
    });
});
