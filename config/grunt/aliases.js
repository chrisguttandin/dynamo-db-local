module.exports = {
    lint: [
        'sh:lint-config',
        'sh:lint-src',
        'sh:lint-test'
    ],
    test: [
        'sh:test-integration',
        'sh:test-unit'
    ]
};
