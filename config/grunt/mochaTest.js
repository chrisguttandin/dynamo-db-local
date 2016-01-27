'use strict';

var chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai');

chai.use(sinonChai);

module.exports = {
    test: {
        options: {
            bail: true,
            clearRequireCache: true,
            require: [
                function () {
                    global.expect = chai.expect;
                    global.sinon = sinon;
                }
            ]
        },
        src: [
            'test/integration/**/*.js',
            'test/unit/**/*.js'
        ]
    }
};
