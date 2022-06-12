const scanner = require("sonarqube-scanner");

scanner(
  {
    serverUrl: "http://localhost:9000",
    token: "sqp_262ca4e0378517f3b9fb0bc20e8871207fc43506",
    options: {
      "sonar.projectName": "My App",
      "sonar.projectDescription": 'Description for "My App" project...',
      "sonar.sources": "../",
      "sonar.tests": "specs",
    },
  },
  () => process.exit()
);
