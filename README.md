# LivePos

Prosjektet baserer seg på:
 
 * Frontend rammeverkene [Angular](https://angular.io) og [Angular Material](https://material.angular.io/)
 * Mobil-plattformen [Firebase](https://firebase.google.com) og implementasjonen [AngularFire2](https://github.com/angular/angularfire2)
 * Offline Support via [Service Worker Precache](https://github.com/GoogleChrome/sw-precache)
 
 Implementasjonen er inspirert av disse prosjektene
 * [Fast Offline Angular Apps with Service Workers](https://coryrylan.com/blog/fast-offline-angular-apps-with-service-workers) 
  som ble brukt som utgangspunkt for UI og å få basis offline egenskaper med ServiceWorker og SW Precache. 
  Denne koden bruker ikke Firebase, men siden den har en god lagdeling med bruk av RxJs og Observables i servicene
  var det en relativt enkel jobb å legge til Firebase
 * [Todo app with Angular2, AngularFire2, and Firebase SDK 3](https://github.com/r-park/todo-angular2-firebase) 
 har støtte for Firebase og Autentisering  (ikke implementert her ennå) og ble brukt som eksempel/inspirasjon
 
 Prosjektet bruker Jira som prosjektstyring og confluence for dokumentasjon
 * Jira: https://ciber-norge.jira.com/secure/RapidBoard.jspa?rapidView=160&projectKey=TRAF
 * Confluence: https://ciber-norge.jira.com/wiki/spaces/TRAF/overview
 
 Prosjektet er deployet til
 * Utviklingsmiljø (DEV): https://livepos-dev.firebaseapp.com/
 * Produksjonsmiljø (PROD): 


## Requirments

Node and Npm:

The app depends on Angular CLI, currently v1.0.0 and according do the Angular CLI doc you need 

- Node 6.9.0 or higher
- NPM 3 or higher

To install Angular CLI and firebase CLI
- `npm install -g @angular/cli`
- `npm install -g firebase-tools`

See [Angular CLI](https://github.com/angular/angular-cli).

If you run into problems installing with 'npm install' or running the app with 'npm start' from a fresh install, it might be a 
good idea to check the Angular version in the 'package.json' against the Angular CLI requirements at 
[Angular CLI](https://github.com/angular/angular-cli) in case the version information given here is outdated.

## Installation

Run these commands 

- `git clone https://github.com/richardmartinsen/livepos.git`

- `cd livepos`

- `npm install`


## Development server

Run `npm start` for a dev server in development mode. Navigate to `http://localhost:4300/`. The app will automatically reload if you change any of the source files.

Run `ng serve -port 4300 -prod` for running a dev server in production mode. You should see much smaller bundles in the "Network" panel in Chrome since files have been minified.


## SW Precache

To see the SW Precache in action follow the steps in the "SW Precache" chapter in the [Fast Offline Angular Apps with Service Workers](https://coryrylan.com/blog/fast-offline-angular-apps-with-service-workers) article on how to generate a Service Worker file and 
start at live-server to serve static content.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running against your own Firebase database

When developing, it is a good idea to create your own Firebase project and test against that database instead of the one that the app use as default.

After creating your own project/database, go to the console, choose your project and click "Add Firebase to your web app". 
Copy the content of the config shown and replace the content of the "export const firebaseConfig" in the 'app.module.ts' file with your own.

## Deploy to Firebase

Follow the instructions on [Firebase hosting](https://firebase.google.com/docs/hosting).
As before, when developing it is a good idea to deploy to your own Firebase project, see above.

Log in to firebase with
* 'firebase login'

To select the correct firebase project
* Run 'firebase list' to see a list of the firebase projects you have access to, the current project are highlighted
* Run 'firebase use <your project>' to select your project
* Run 'firebase list' again to verify that the correct project is selected

Minimum required steps
* Run 'ng build -prod' or 'ng build -prod' (for production) to build to the projects 'dist' folder
* Run 'npm run sw' to generate a Service Worker file and content to the /dist folder
* Run 'firebase deploy' to deploy the app

You may run into several problems with login to firebase, selecting the right project etc. 
Just google any error messages and the solution will be found pretty fast. 

## Unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
And please, add unit tests to your code!
 
## End-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

The e2e tests are currently not working. Any help is appreciated.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
