# Aurelia Firebase SSR Starter

An Aurelia starting application for working with Firebase, with support for server-side rendering.

## What this starter includes

* Setup to work with TypeScript
* Firebase
* Authentication (email/password and social auth sigin via Google) using Firebase
* Firebase' FireStore for the database
* Setup for routing by default
* Server-side rendering
* Setup for state management using Aurelia Store

## How to use this starter

This project skeleton assumes a few things; that you want an application with routing, you need a state management solution, you will be working with Firebase, you have authentication, you fetch data from Firebase and display it. More importantly, it also includes server-side rendering with initial state passed in from the server.

- Pull down this Github project (or download a zip)
- Run `yarn` or `npm install`
- Add in your Firebase settings from the Firebase console to the `src/firebase.ts` file
- Add your Project ID to `.firebaserc` file

## Building

- `au build` will do a development build
- `au build --env prod` will do a production build

## Watching

- `au run --watch` will watch the application for changes and refresh

## Server-side rendering

Because server-side rendering uses tasks. To run server-side rendering locally you need to run two tasks in two separate terminals, one watches the application itself and builds it, the other runs the development server.

- `npm run watch`
- `npm run server`

Running both of these tasks will give you a local development server showcasing server-side rendering.

## Building for server-side rendering

Unlike the above build tasks using the CLI, to build our SSR application we run the custom `build:ssr` task. It is worth keeping in mind this will do a production build for server-side rendering.

To build run the `build:ssr` task using Npm or Yarn:

- npm run build:ssr

or

- yarn build:ssr
