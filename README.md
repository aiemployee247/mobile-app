# Mobile App

React Native (Expo) login & signup app for **Android** and **iOS**.

Platform brands:
- **Android** — GStream (`com.gstream.auth`)
- **iOS** — AStream (`com.astream.auth`)

## Features

- **Welcome** → **Sign in** / **Create Account**
- **Sign up** — first/last name, email, password, confirm password, birthdate, opt-ins
- **Log in** — email and password with show/hide toggle
- **Dashboard + Profile** tabs after auth
- **Session** — stays signed in across app restarts (AsyncStorage)

Accounts are stored locally on the device (demo auth, no backend).

## Prerequisites

- Node.js **20.19.4+** (or 22+)
- [Expo Go](https://expo.dev/go) on your phone, or an Android emulator / iOS simulator

## Run

```bash
npm install
npm start
```

Then press `a` for Android, `i` for iOS, or scan the QR code with Expo Go.

## Native builds

```bash
npx expo prebuild
npx expo run:android
npx expo run:ios
```

Release APK (Android):

```bash
cd android && ./gradlew assembleRelease
```

## Try it

1. Open the app → **Get Started** → **Sign Up**
2. Create an account and land on the Dashboard
3. Open **Profile**, or **Log out** and sign in again
