# triplecheck-example-cloudrun

## TripleCheck broker running on Google Cloud Run with Firestore

This repo demonstrates a working, basic implementation of a [TripleCheck broker](https://github.com/mikaelvesavuori/triplecheck-broker) running on Google Cloud Run with Firestore as the database.

Refer to the documentation on the [broker](https://github.com/mikaelvesavuori/triplecheck-broker) for how to call the API.

Technology choices are:

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org)

## Pre-requisites

- A Google Cloud Platform account
- Logged in on GCP
- Sufficient credentials to deploy and use Cloud Run and Firestore
- Enable Firestore (Native mode) in the GCP web console, create a database called `broker-demo` – if you change it you need to make sure that `src/index.ts` points to whatever you called your Firestore
- Configure `init.sh` and `deploy.sh` so they use your own values

## Installation

Run `npm install` or `yarn install` in both the root and `src` folders.

## Initialize GCP service account

**First ensure the details in `init.sh` are correct.**

Run `npm run init`.

## Local development

Run `npm start` or `yarn start`.

## Docker

Run `npm run docker:build` or `npm run docker:start` respectively to build and run a container.

## Deploy

**First ensure the details in `deploy.sh` are correct.**

Note: There is no need to use Docker manually to build the container when we let `gcloud` handle the deployment and build process.

Run `npm run deploy` or `yarn run deploy`.
