import { createRouter, createWebHistory } from 'vue-router';

import { isAuthenticated } from '../auth';
import AddBookView from '../views/AddBookView.vue';
import AboutView from '../views/AboutView.vue';
import AccessDeniedView from '../views/AccessDeniedView.vue';
import CountBookAPIView from '../views/CountBookAPIView.vue';
import GetAllBookAPIView from '../views/GetAllBookAPIView.vue';
import GetBookCountView from '../views/GetBookCountView.vue';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import WeatherView from '../views/WeatherView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/access-denied',
    name: 'AccessDenied',
    component: AccessDeniedView
  },
  {
    path: '/add-book',
    name: 'AddBook',
    component: AddBookView
  },
  {
    path: '/getbookcount',
    name: 'GetBookCount',
    component: GetBookCountView
  },
  {
    path: '/WeatherCheck',
    name: 'GetWeather',
    component: WeatherView
  },
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPIView
  },
  {
    path: '/GetAllBookAPI',
    name: 'GetAllBookAPI',
    component: GetAllBookAPIView
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return {
      name: 'Login',
      query: {
        denied: 'true',
        redirect: to.fullPath
      }
    };
  }

  if (
    (to.name === 'Login' || to.name === 'AccessDenied') &&
    isAuthenticated.value
  ) {
    return {
      name: 'About'
    };
  }

  return true;
});
export default router;
