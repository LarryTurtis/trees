module.exports = function(config) {
    config.set({
        basePath: './',
        frameworks: ['browserify', 'mocha', 'chai', 'sinon'],
        reporters: ['mocha'],
        browsers: ['PhantomJS'],
        files: ['src/**/*.js', 'test/*.js', 'node_modules/sat-js/SAT.js'],
        exclude: ['src/app.js'],
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
