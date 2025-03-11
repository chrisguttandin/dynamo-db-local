module.exports = () => {
    return {
        'build': {
            cmd: 'npm run build'
        },
        'test-integration': {
            cmd: 'mocha --bail --parallel --recursive --require config/mocha/config-integration.js test/integration'
        },
        'test-unit': {
            cmd: 'mocha --bail --parallel --recursive --require config/mocha/config-unit.js test/unit'
        }
    };
};
