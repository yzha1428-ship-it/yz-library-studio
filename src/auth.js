import { ref } from 'vue';

const AUTH_STORAGE_KEY = 'week5-is-authenticated';

// Classroom-only credentials for the Week 5 routing activity.
// A production application must authenticate on a trusted server.
const DEMO_USERNAME = 'libraryuser';
const DEMO_PASSWORD = 'Library123!';

const isAuthenticated = ref(
  sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true'
);

const login = (username, password) => {
  const isValid =
    username === DEMO_USERNAME &&
    password === DEMO_PASSWORD;

  isAuthenticated.value = isValid;

  if (isValid) {
    sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
  } else {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
  }

  return isValid;
};

const logout = () => {
  isAuthenticated.value = false;
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
};

export {
  DEMO_PASSWORD,
  DEMO_USERNAME,
  isAuthenticated,
  login,
  logout
};
