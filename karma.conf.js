module.exports = function(config) {
  config.set({
    basePath: './',
    frameworks: ['mocha', 'chai'],
    browsers: ['PhantomJS'],
    files: ['src/**/*.es5.js', 'test/*.js'],
    preprocessors: {
      'src/**/*.js': ['babel'],
    },
    babelPreprocessor: {
      options: {
        presets: ['es2015'],
        sourceMap: 'inline'
      },
      filename: function (file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    }
  });
};