import { getApp, getApps, initializeApp } from 'firebase/app';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

const useFirebaseEmulators = import.meta.env.VITE_USE_FIREBASE_EMULATORS === 'true';
const configuredProjectId = import.meta.env.VITE_FIREBASE_PROJECT_ID?.trim();
const configuredApiKey = import.meta.env.VITE_FIREBASE_API_KEY?.trim();
const projectId = configuredProjectId || 'demo-fit5032-efolio';
const firestoreEmulatorHost = import.meta.env.VITE_FIRESTORE_EMULATOR_HOST
  || '127.0.0.1';
const firestoreEmulatorPort = Number(
  import.meta.env.VITE_FIRESTORE_EMULATOR_PORT || 8080
);

const productionConfigurationPresent = Boolean(
  configuredProjectId && configuredApiKey
);

const isFirebaseConfigured = useFirebaseEmulators || productionConfigurationPresent;

const firebaseConfig = {
  apiKey: configuredApiKey || 'demo-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN?.trim()
    || `${projectId}.firebaseapp.com`,
  projectId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID?.trim()
    || '1:000000000000:web:demo'
};

let db = null;

if (isFirebaseConfigured) {
  const app = getApps().length > 0
    ? getApp()
    : initializeApp(firebaseConfig);

  db = getFirestore(app);

  if (useFirebaseEmulators && typeof window !== 'undefined') {
    const emulatorFlag = '__fit5032FirestoreEmulatorConnected';

    if (!window[emulatorFlag]) {
      connectFirestoreEmulator(
        db,
        firestoreEmulatorHost,
        firestoreEmulatorPort
      );
      window[emulatorFlag] = true;
    }
  }
}

const firebaseSetupMessage = isFirebaseConfigured
  ? ''
  : 'Firebase is not configured. Copy .env.example to .env.local and add your Firebase Web App configuration, or enable the local emulator.';

export {
  db,
  firebaseSetupMessage,
  isFirebaseConfigured,
  projectId,
  useFirebaseEmulators
};
