module.exports = {
    'test-integration': {
        cmd: 'mocha --bail --require config/mocha/config-integration.js test/integration'
    },
    'test-unit': {
        cmd: 'mocha --bail --require config/mocha/config-unit.js test/unit'
    }
};
