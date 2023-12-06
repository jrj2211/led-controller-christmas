Do not open directly in android studio, open as normal node.js project:

1. npm install
2. npm run android

## Upgrade Capacitor:

```
npm i -D @capacitor/cli@latest
npx cap migrate
```

## Native Android Run

Add JAVA_HOME to system path:

```
JAVA_HOME = C:\Program Files\Android\Android Studio\jbr
```

Live Update

```
npx cap run android -l --external
```
