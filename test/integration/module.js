'use strict';

var dynamoDbLocal = require('../../src/module.js');

describe('dynamoDbLocal', function () {

    describe('spawn()/kill()', function () {

        it('should spawn and kill an instance of DynamoDB Local', function () {
            var dynamoDbLocalProcess = dynamoDbLocal.spawn();

            dynamoDbLocalProcess.kill();
        });

    });

});
