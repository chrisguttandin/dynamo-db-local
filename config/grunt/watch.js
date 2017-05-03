module.exports = {
    continuous: {
        files: [
            'src/**/*.js',
            'test/unit/**/*.js'
        ],
        options: {
            spawn: false
        },
        tasks: [
            'test'
        ]
    }
};
