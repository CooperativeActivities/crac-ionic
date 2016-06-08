crac-ionic
=====================

Prototype for the CooperativeActivities app made with Ionic.

## Using this project

After checkout of the project run

```bash
$ npm install
$ bower install
```

to install third party dependencies.
If cordova-specific errors occur, install cordova and ionic separately and globally on your machine:

```bash
$ sudo npm install -g cordova
$ sudo npm install -g ionic
```

Then add specific platforms:

```bash
$ ionic platform add ios
$ ionic platform add android
```

To build execute following commands:

```bash
$ ionic build ios
$ ionic build android
```

To emulate on a platform run following commands:

```bash
$ ionic emulate ios
$ ionic emulate android
```

## Install app in iOS

To install the app on iOS, switch to the folder /platforms/ios and open the xcode-Project.

## Issues
If Android is not installed:

```bash
npm install android
```

## Ressources

http://ionicframework.com/docs/cli/ -- CLI Beschreibung
http://ionicframework.com/docs/components/ -- Components