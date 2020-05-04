# alexangas-web

[![Build Status](https://dev.azure.com/alexangas/blog/_apis/build/status/alexangas.alexangas-web-ci?branchName=master)](https://dev.azure.com/alexangas/blog/_build/latest?definitionId=7&branchName=master)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=alexangas_alexangas-web&metric=alert_status)](https://sonarcloud.io/dashboard?id=alexangas_alexangas-web)

This is the source for https://www.alexangas.com. It contains the following nifty aspects...

- DevOps
  - Azure Pipelines (YAML)
    - Deployment to Azure Storage blob container with azcopy
    - Unit tests including code coverage with jest / junit / cobertura
    - End-to-end tests with cypress
    - GitHub pull request integration
  - Static Code Analysis with SonarCloud, using GitHub integration
  - Local development with Docker (dev and production builds)
