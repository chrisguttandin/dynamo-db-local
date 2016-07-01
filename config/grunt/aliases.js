'use strict';

module.exports = {
    continuous: [
        'mochaTest:test',
        'watch:continuous',
    ],
    lint: [
        'eslint'
    ],
    test: [
        'mochaTest:test',
    ]
};
