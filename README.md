# alexangas-web

This is the source for https://www.alexangas.com. It contains the following nifty aspects...

- DevOps
  - Azure Pipelines (YAML)
    - Deployment to Azure Storage blob container with azcopy
    - Unit tests including code coverage with jest / junit / cobertura
    - End-to-end tests with cypress
    - GitHub pull request integration
  - Static Code Analysis with SonarCloud, using GitHub integration
  - Local development with Docker (dev and production builds)
