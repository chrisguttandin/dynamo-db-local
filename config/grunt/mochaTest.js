'use strict';

const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

module.exports = {
    test: {
        options: {
            bail: true,
            clearRequireCache: true,
            require: [
                function () {
                    global.expect = chai.expect;
                }
            ]
        },
        src: [
            'test/integration/**/*.js',
            'test/unit/**/*.js'
        ]
    }
};
