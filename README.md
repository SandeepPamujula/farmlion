# farmlion
farmlion - A destination for smart farmers and customers

## Table of contents

- [Prerequisite](#prerequisite)
- [Setup Instructions](#setup-instructions)
- [Pull Request](#pull-request)
- [Environment Variables](#environment-variables)
- [Test](#test)
- [Coverage](#coverage)
- [Linting](#linting)
- [Sonarqube](#sonarqube)
- [Swagger Docs](#swagger-docs)
- [Dependency Services](#dependency-services)

## Prerequisite

- Install [Node.js](https://nodejs.org/en/) (10.15.0)
- Install [Postgres](https://www.postgresql.org/) (10.7)
- Install yarn (`npm i yarn -g`)
- Install typescript (`npm i typescript -g`)

## Setup Instructions

- Clone mentioned projects in your workspace
  `git clone https://github.com/SandeepPamujula/farmlion.git`
- `cd auth-ms`
- Run `yarn` - to install the packages
- Change environment variables. Please take a look at [Environment Variables](#environment-variables)
- Run `yarn start`

## Pull Request

- `git clone https://github.com/SandeepPamujula/farmlion.git`
- `git checkout master`
- Create new branch
  - for feature: git checkout -b feature/add_readme
  - for bugfix: git checkout -b feature/add_login_fix
  
- commit and push your changes to feature or bugfix branch.
    - git commit -am  "add commit name" 
    - git push --set-upstream origin feature/init_basecode
- Create a pull request in github and add a reviewer.

## Environment Variables

- `cd auth-ms`

## Test

- To execute tests, run `yarn test`

## Coverage

- To see test coverage report, run `yarn coverage`

## Linting

- To see lint issues, run `yarn lint`

## Sonarqube

- Before running sonarqube we have to run `yarn coverage` for code coverage and test cases report
- Run `yarn sonar`


# Swagger Docs


# Dependency Services
