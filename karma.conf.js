// Karma configuration
// Generated on Wed Jan 22 2020 19:33:37 GMT+0200 (Восточная Европа, стандартное время)

module.exports = function (config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: ['HW/js/*.test.js'],

    // list of files / patterns to exclude
    exclude: [],

    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-sourcemap-loader',
      'karma-coverage',
      'karma-webpack',
      'karma-spec-reporter',
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {'HW/js/*.test.js': ['webpack', 'sourcemap', 'coverage']},

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'coverage'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    webpack: {
      mode: 'none',
      module: {
        rules: [
          {
            test: /\.js$./i,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            options: {
              presets: ['babel/preset-env'],
            },
          },
        ],
      },
    },
  });
};
