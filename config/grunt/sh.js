module.exports = (grunt) => {
    const fix = grunt.option('fix') === true;

    return {
        'lint-config': {
            cmd: 'npm run lint:config'
        },
        'lint-src': {
            cmd: 'npm run lint:src'
        },
        'lint-test': {
            cmd: `eslint --config config/eslint/test.json --ext .js ${fix ? '--fix ' : ''}--report-unused-disable-directives test/`
        },
        'test-integration': {
            cmd: 'mocha --bail --parallel --recursive --require config/mocha/config-integration.js test/integration'
        },
        'test-unit': {
            cmd: 'mocha --bail --parallel --recursive --require config/mocha/config-unit.js test/unit'
        }
    };
};
