const scanner = require('sonarqube-scanner');

scanner(
  {
    serverUrl: process.env.SONAR_HOST_URL || 'http://localhost:9000',
    token: process.env.SONAR_TOKEN || '',
    options: {
      'sonar.projectKey': 'notehive-frontend',
      'sonar.projectName': 'NoteHive Frontend',
      'sonar.projectVersion': '1.0.0',
      'sonar.sources': 'src',
      'sonar.tests': 'src',
      'sonar.test.inclusions': '**/*.test.js,**/*.test.jsx,**/*.spec.js,**/*.spec.jsx,**/tests/**,**/__tests__/**',
      'sonar.exclusions': '**/node_modules/**,**/*.test.js,**/*.test.jsx,**/tests/**,**/coverage/**,**/__tests__/**,**/*.spec.js,**/*.spec.jsx',
      'sonar.coverage.exclusions': '**/node_modules/**,**/*.test.js,**/*.test.jsx,**/tests/**,**/coverage/**,**/__tests__/**,**/*.spec.js,**/*.spec.jsx,**/src/main.jsx',
      'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
      'sonar.testExecutionReportPaths': 'coverage/test-reporter.xml',
    },
  },
  () => process.exit()
);