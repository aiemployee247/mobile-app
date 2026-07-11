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
npm run android   # or: npm run ios
```

Release APK:

```bash
npm run build:android
# → android/app/build/outputs/apk/release/app-release.apk
```

## E2E (Appium)

Appium specs live in [`e2e/`](./e2e) so deploy CI can **build → upload → verify** the same commit.

```bash
npm install --prefix e2e
npm run build:android
npm run appium            # terminal 1
npm run test:e2e:android  # terminal 2 (emulator running)
```

CI: `.github/workflows/e2e-sauce-android.yml` builds the APK, uploads to Sauce Labs, and runs the suite. Add secrets `SAUCE_USERNAME` and `SAUCE_ACCESS_KEY`.

See [e2e/README.md](./e2e/README.md) for details.

## Try it

1. Open the app → **Get Started** → **Sign Up**
2. Create an account and land on the Dashboard
3. Open **Profile**, or **Log out** and sign in again
