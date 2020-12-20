# GraphQL-TypeScript Server Starter

Lightweight boilerplate for a GraphQL TypeScript server for MongoDB databases with basic user functionality included.

## Features

-  Type-GraphQL.
-  Mikro-Orm with MongoDB.
-  GraphQL schema and ORM entities can be defined in the same class!
-  Apollo server as the GraphQL server.
-  Redis cache for user cookies.
-  Generate enviroment variable types with gen-env-types.

### TypeScript Features

-  Continously watches .ts files for changes and converts them to JavaScript in a seperate file.
-  Uses nodemon to run the index.js file.
-  ESLint with recommended linting rules for TypeScript.
-  VSCode setting for running linting command when a file is saved.

## Getting Started

**Step 1:** Clone the repo.

```bash
$ git clone https://github.com/ThomasRainford/node-typescript-starter.git
$ cd node-typescript-starter
```

**Step 2:** Install the dependencies using yarn.

```bash
$ yarn
```

**Step 3:** Watch the .ts files.

```bash
$ yarn watch
```

**Step 4:** Launch in dev mode.

```bash
$ yarn dev
```

The .ts files will be compiled to JavaScript and placed in the dist directory. Nodemon will then run the project using the index.js file.

**Note:** Step 3 and step 4 will need to be run in seperate terminals.
