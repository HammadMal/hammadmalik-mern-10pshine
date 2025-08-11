const scanner = require('sonarqube-scanner');

console.log('Starting SonarQube scan...');

scanner(
  {
    serverUrl: process.env.SONAR_HOST_URL || 'http://localhost:9000',
    token: process.env.SONAR_TOKEN,
    options: {
      'sonar.projectKey': 'notehive-frontend',
      'sonar.projectName': 'NoteHive Frontend',
      'sonar.projectVersion': '1.0.0',
      'sonar.sources': 'src',
      'sonar.exclusions': '**/node_modules/**,**/*.test.js,**/*.test.jsx,**/tests/**,**/coverage/**,**/__tests__/**',
      'sonar.verbose': 'true'
    },
  },
  (error) => {
    if (error) {
      console.error('Error during scan:', error);
    } else {
      console.log('Scan completed successfully!');
    }
    process.exit();
  }
);