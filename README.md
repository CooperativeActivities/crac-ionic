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

To start the web-view, run

```bash
$ ionic serve
```

To get ios and android in comparison in the webview, run

```bash
$ ionic serve --lab
```

## Install app in iOS

To install the app on iOS, switch to the folder /platforms/ios and open the xcode-Project.

## Issues
If Android is not installed:

```bash
npm install android
```

## Ressources

http://ionicframework.com/docs/cli/ -- CLI Beschreibung.
http://ionicframework.com/docs/components/ -- Components

# License

       Copyright 2017 CrAc syndicate (http://www.crac.at/project-facts/partners)

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
