module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('@chiragrupani/karma-chromium-edge-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-sabarivka-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {},
      clearContext: false
    },
    jasmineHtmlReporter: {
      suppressAll: true
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/'),
      subdir: '.',
      include: [
        'src/**/*.(ts|js)',
        '!src/**/*.spec.*',
        '!src/**/*main.ts',
        '!src/**/*test.ts',
        '!src/**/*environment.**'
      ],
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
        { type: 'cobertura'}
      ],
      check: {
        global: {
          statements: 60,
          branches: 40,
          functions: 60,
          lines: 60
        }
      }
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless', 'EdgeHeadless'],
    customLaunchers: {
      headless: {
        base: 'EdgeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-setuid-sandbox'
        ]
      }
    },
    singleRun: true,
    restartOnFileChange: true
  });
};