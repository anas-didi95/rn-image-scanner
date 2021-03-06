# React Native Image Scanner

---

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Features](#features)
* [Environment Variables](#environment-variables)
* [Setup](#setup)
* [References](#references)
* [Contact](#contact)

---

## General info
An app to find phone numbers, email and website links available in a photo and then organize it in the app.

---

## Technologies
* React Native - Version 0.63.4
* Native Base - Version 2.15.2
* React Navigation - Version 5.9.2
* React Native Dotenv - Version 2.5.3
* React Native Image Crop Picker - Version 0.36.0

---

## Features
- [x] User can either click a photo or upload a photo from the gallery
- [x] Processing is done on the image.
- [x] If there are any phone numbers, email or web links present in the image then they are listed in the cards properly organized.
- [x] On tap on the phone, email or web link, an option is provided to open phone app, email or web browser respectively.
- [x] History of search results are provided in the list view

---

## Environment Variables
Following table is a **mandatory** environment variables used in this project.

| Variable Name | Datatype | Description |
| --- | --- | --- |
| GOOGLE_CLOUD_VISION_API_KEY | String | API key for Google Cloud Vision |

---

## Setup

This project is configured with VSCode devcontainer with Node and Java installed. Following guides are how to connect to physical device and run the app.

1. Connect your Android device to the system (make sure debug mode is enabled)
2. Run script `adb-connect.sh` with IP address of WiFi of the device.
```sh
./adb-connect.sh 192.168.0.103
```
3. Run script `adb-devices.sh` to check device is connected to WiFi.
4. Start devcontainer using VSCode.
5. Run script `adb-connect.sh` with same IP address in the devcontainer.
6. Run script `adb-devices.sh` in devcontainer to check device is connected to WiFi.
7. Run command `yarn start` and `yarn android` to run the app.

To close the device connection, run script `adb-killserver.sh`.

---

## References
* [App ideas: Image Scanner](https://github.com/florinpop17/app-ideas/blob/master/Projects/2-Intermediate/Image-Scaner.md)
* [How to dockerize Flutter apps](https://blog.codemagic.io/how-to-dockerize-flutter-apps/)
* [Java: How to resolve java.lang.NoClassDefFoundError: javax/xml/bind/JAXBException](https://stackoverflow.com/questions/43574426/java-how-to-resolve-java-lang-noclassdeffounderror-javax-xml-bind-jaxbexceptio)
* [Create a React Native Image Recognition App with Google Vision API](https://blog.jscrambler.com/create-a-react-native-image-recognition-app-with-google-vision-api/)
* [Quick guide for updating package name in React Native](https://dev.to/karanpratapsingh/quick-guide-for-updating-package-name-in-react-native-3ei3)

---

## Contact
Created by [Anas Juwaidi](mailto:anas.didi95@gmail.com)
