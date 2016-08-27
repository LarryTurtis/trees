module.exports = function(config) {
    config.set({
        basePath: './',
        frameworks: ['browserify', 'mocha', 'chai'],
        browsers: ['PhantomJS'],
        files: ['src/**/*.js', 'test/*.js'],
        preprocessors: {
            'src/**/*.js': ['browserify'],
            'test/*.js': ['browserify'],
        },
        browserify: {
            debug: true,
            transform: [
                ['babelify', { presets: ["es2015"] }]
            ]
        },
        autoWatch: true
    });
};
