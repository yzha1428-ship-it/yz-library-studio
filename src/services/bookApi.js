const region = import.meta.env.VITE_FUNCTIONS_REGION || 'australia-southeast1';
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID
  || 'demo-fit5032-efolio';
const usingEmulators = import.meta.env.VITE_USE_FIREBASE_EMULATORS === 'true';

const defaultBaseUrl = usingEmulators
  ? `http://${import.meta.env.VITE_FUNCTIONS_EMULATOR_HOST || '127.0.0.1'}:${import.meta.env.VITE_FUNCTIONS_EMULATOR_PORT || 5001}/${projectId}/${region}`
  : `https://${region}-${projectId}.cloudfunctions.net`;

const apiBaseUrl = (import.meta.env.VITE_BOOK_API_BASE_URL || defaultBaseUrl)
  .replace(/\/$/, '');

const getFunctionUrl = (functionName) => `${apiBaseUrl}/${functionName}`;

export {
  getFunctionUrl
};
