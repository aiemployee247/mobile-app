# Appium / WebdriverIO E2E for this mobile app

Specs live next to the app so CI can **build the APK/app → upload → verify**.

```
e2e/
  pages/          # Welcome, Login, SignUp, Home
  shared/         # MobileBasePage
  tests/          # MOBILE-APP-*-TC-*.spec.ts
  wdio.android.conf.ts
  wdio.ios.conf.ts
```

## Local — Android

```bash
# Terminal 1
npm run appium --prefix e2e

# Build release APK (embeds JS — no Metro needed)
npm run build:android

# Terminal 2 — emulator running
npm run test:e2e:android
```

## Local — iOS

```bash
npm run build:ios
npm run test:e2e:ios
```

## Sauce Labs (CI)

On push/PR to `main`, `.github/workflows/e2e-sauce-android.yml`:

1. Builds `android/.../app-release.apk`
2. Uploads it to Sauce Storage
3. Runs `e2e` Appium specs against that build

Required GitHub secrets: `SAUCE_USERNAME`, `SAUCE_ACCESS_KEY`.

Manual run:

```bash
cd e2e
export APPIUM_PROVIDER=sauce
export SAUCE_USERNAME=...
export SAUCE_ACCESS_KEY=...
export MOBILE_APP_SAUCE_APP=storage:<file-id>
npm run test:android
```
