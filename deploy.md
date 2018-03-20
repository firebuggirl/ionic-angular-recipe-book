## iOS:

  - ` ionic cordova platform add ios ` //will add iOS as a platform + also execute a build

  - To re-build again later:

        ` ionic cordova build ios `


  * Open xCode and navigate to project `directory->platforms->ios->assignment2.xcodeproj`

      * go to `preferences->accounts-> + to create Apple ID `..
          then `view details ` ....need to set up a `signing identity` for `iOS Development` -> `create`
          ...can create one if don't have one already

            - NOTE: can't create one for Developer Distribution w/out paid Apple developer account

            - go back to project in xCode editor and choose your personal `team` in `signing` block/area

              - can now run it on a device or on a simulator

      - Pick device that want to test on from drop down list and hit `play` in top left hand corner of Xcode

      - NOTE: there is a console that logs out the progress of the build along with any errors.

      * To `run on device` from command line:

        - ` ionic cordova run ios --device `

      * To `run on emulator` via command line:

        - ` ionic cordova emulate ios `

## Building for Android

* Requirements:

https://cordova.apache.org/docs/en/latest/guide/platforms/android/

  - Java Development Kit (JDK)
  http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html


  - Android SDK Manager OR Stand alone tools

  https://developer.android.com/studio/index.html
    - Open the `Android SDK Manager` (run android or sdkmanager from the terminal) and make sure the following are installed:

    -  Android Platform SDK for your targeted version of Android
      Android SDK build-tools version 19.1.0 or higher
      Android Support Repository (found under "Extras")
      See Android's documentation on Installing SDK Packages for more details.

      https://developer.android.com/studio/intro/update.html

    - pick Android version (in Android SDK Manager) + make sure compatible w/ Cordova ...pick the highest version that you want to support

    - under `extras`, check `Android Support Repository` to install as well ...allows for the support of older devices

      - `install`

   * To use simulator:

    - ` ionic cordova platform add android `

    - ` ionic cordova build android `

    - ` ionic cordova emulate android `

  * Open existing android project in Android SDK Manager + load `android` folder in `platforms` directory

  * GO to `tools/Android/AVD Manager` to create a new virtual device ...follow prompts in window


    - hit `play`

## Run from command line:

  ` ionic cordova emulate android `

  ` ionic cordova run android --device `//to run on device



### Step-by-step Guide for Building for iOS and Android

  https://ionicframework.com/docs/intro/deploying/

  -  Cordova Docs (for the different platforms):

      - Android: https://cordova.apache.org/docs/en/latest/guide/platforms/android/


      - iOS: https://cordova.apache.org/docs/en/latest/guide/platforms/ios/

  * Instructor notes:


     - ionic build  vs ionic run  vs ionic emulate  - When to use what?

        We have three commands which all have something to do with building our app (for real devices or simulators).

        ionic build ios  or ionic build android  builds the app for the specified platform. "Build" means: It converts our web app into a real native application (=> the Cordova build process is triggered).

        You need to run this command if you plan to open the built project in Android Studio or XCode.

        ionic run ios  or ionic run android  also builds the project but then also ships the project to a connected device. Use this command if you don't want to use Android Studio or XCode to launch the app on your device.

        Important: When running your app on an iOS device for the first time you MUST launch it through XCode first (because your app needs to get signed). You will also need to accept this app on your phone. Find more information here: https://ionicframework.com/docs/setup/deploying/#ios-devices

        If you don't want to use your real device (or you don't have one), you can use a simulator.

        ionic emulate ios  or ionic emulate  android runs your app on an existing simulator or launches an simulator if none is present. For Android, this will only work if you created a virtual device using the Android Virtual Device Tool. Find more information about this here: https://developer.android.com/studio/run/managing-avds.html

### Rules options:

      `  {
          "rules": {
            ".read": "auth != null",
            ".write": "auth != null"
          }
        } `

          - OR-
        `  {
            "rules": {
                // won't let people delete an recipe/shopping list
                ".write": "!data.exists()",
                ".read": true,
                "$room" : {
                  // only the authenticated user can edit the data
                  ".write" : "auth != null && (!data.exists() || data.child('owner').val() === auth.uid)",
                  ".read" : true
                }
            }
        } `
