module.exports = {
    continuous: [
        'sh:test-unit',
        'watch:continuous'
    ],
    lint: [
        'eslint'
    ],
    test: [
        'sh:test-integration',
        'sh:test-unit'
    ]
};
