'use strict';

module.exports = {
    continuous: [
        'mochaTest:test',
        'watch:continuous',
    ],
    lint: [
        'jshint'
    ],
    test: [
        'mochaTest:test',
    ]
};
