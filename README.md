# Prodap Test

## _Icecream challenge_

This is a test case for PRODAP.
It consists on an API to manage an icecream store stock.
(You can read the entire case on Case-dev-senior.pdf).

The IceCream API use the feathers framework (https://feathersjs.com/) .

## Features

- Create stocks of icecream
- Easily integrates with any app consumer using feathers client, Socket.io client or REST consumer
- Optimized for offline-first use

## Stack

The IceCream API uses a number of open source projects to work properly:

- [Node JS] - JavaScript Runtime
- [Typecript] - Extend your javascript with types and future features!
- [FeathersJS] - A modern node framework transport agnostic focused on realtime applications.

## Installation

The IceCream API requires [Node.js](https://nodejs.org/) v14, and a [Mongo](https://www.mongodb.com/) replica set running.

The easiest way to install it is to use docker and the [VSCode DevContainer](https://code.visualstudio.com/docs/remote/containers) extension.

## Installation with devcontainer

Open the project with VSCode, access the command palette (usually F1) and enter the option "Open Folder in Container".
It will start a remote container session. Once the setup is finished, you can start a terminal inside VSCode and run

```sh
npm install
npm run tests
npm run dev
```

## Bare Installation

Install the dependencies (Mongo as a replica set and Node 14) and run the commands:

```sh
cd prodap-test
npm i
npm run test
npm run dev
```

## Project Structure

- [.devcontainer](./devcontainer) - Contain files for [VSCode Dev Containers](https://code.visualstudio.com/docs/remote/containers) run. It consists on simple docker and docker-compose files. You can try these files if you want to run the project without the dev containers extension.
- [src](./src) - Where our code lives
- - [common-types](./src/common-types) - Generic interfaces and types
- - [middleware](./src/middleware) - Generic middlewares
- - [models](./src/models) - Our application models
- - [services](./src/services) - Our application services. Services are the barebones of feathers applications. For more info: https://docs.feathersjs.com/api/services.html

- [tests](./test) - Where our tests lives. They are separated by service and can be splitted on smaller files.
- [config](./config) - Global config files for our application read more on https://docs.feathersjs.com/api/configuration.html
- [lib](./lib) - Generated after typescript transpilation
- [public](./public) - Contain resources for rendering html and configuration for server rendered pages

## Docs

We have covered a basic usage of API on Postman: [prodap-case.postman_collection.json](./prodap-case.postman_collection.json)
For a full overview of how queries work on feathers, access https://docs.feathersjs.com/api/databases/querying.html
