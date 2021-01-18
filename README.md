- [Basic Setup](#basic-setup)
- [Running the app locally](#running-the-app-locally)
- [Code organization](#code-organization)
- [Testing](#testing)
  - [Unit tests](#unit-tests)
  - [Functional tests](#functional-tests)
- [Docker](#docker)
- [Environment URLs](#environment-urls)


# Basic Setup

- Clone the repo
- Run `bin/setup`

# Running the app locally

- Run `nodemon` or `npx nodemon`
- In debug mode `npm run debug` (runs `nodemon`)
- Base url is `localhost:3000`
- Currently, Swagger UI will **NOT** be able to generate reports.

# Code organization

Given that Express doesn't provide any guidance on the structure of the code,
this is to set up some guidance.

This project attempts to follow the feature-based (of feature-by-folder) type of
code structure. The idea is to compartmentalize code specific to a feature into
its own directory/module. An example of what the layout might look like is:

```
app/
  auth/
    middleware.js
    utils.js
    ...
  users/
    controller.js
    model.js
    utils.js
    index.js
    test/
      model.test.js
      controller.test.js
    ...
  module/
    ...
    test/
  shared/
    ...
test/
 functional/
   users.test.js
   ...
```

The `test/functional/` directory is meant for black-box, functional, e2e tests.
Unit tests would co-locate with the code they are testing, to adhere to the
compartmentalization, module-like isolation.

# Testing

## Unit tests

Run `npm test` to execute unit tests (excluding functional tests)

## Functional tests

Run `bin/dc-run ci npm run test:functional` to execute functional tests.

# Docker

To build a Docker image, run:

```sh
docker-compose build
```

To run the tests via `docker-compose`:

```sh
docker-compose run --rm ci
```

Or to run a shell inside of the container:

```sh
docker-compose run --rm ci sh
```

There is a convenience `bin/dc-run` script, which combines the steps
of building and running, and allows passing in additional arguments to the
default command. **Note: `bin/dc-run` is only for local development.**


# Environment URLs

## Internal Environment URLs

| Environment     | URL                                                  | Notes                |
| --------------- | ---------------------------------------------------- | -------------------- |
| Local Dev       | http://localhost:3000                                |                      |
