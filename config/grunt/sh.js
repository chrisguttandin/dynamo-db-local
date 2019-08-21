module.exports = (grunt) => {
    const fix = (grunt.option('fix') === true);

    return {
        'lint-config': {
            cmd: `eslint --config config/eslint/config.json ${ (fix) ? '--fix ' : '' }--report-unused-disable-directives *.js config/**/*.js`
        },
        'lint-src': {
            cmd: `eslint --config config/eslint/src.json ${ (fix) ? '--fix ' : '' }--report-unused-disable-directives src/**/*.js`
        },
        'lint-test': {
            cmd: `eslint --config config/eslint/test.json ${ (fix) ? '--fix ' : '' }--report-unused-disable-directives test/**/*.js`
        },
        'test-integration': {
            cmd: 'mocha --bail --recursive --require config/mocha/config-integration.js test/integration'
        },
        'test-unit': {
            cmd: 'mocha --bail --recursive --require config/mocha/config-unit.js test/unit'
        }
    };
};
