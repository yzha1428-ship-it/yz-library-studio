<script setup>
import { useRouter } from 'vue-router';

import { isAuthenticated, logout } from '../auth';

const router = useRouter();

const handleLogout = async () => {
  logout();
  await router.push({ name: 'Login' });
};
</script>

<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3 border-bottom">
      <ul class="nav nav-pills align-items-center justify-content-center gap-1">
        <li class="nav-item">
          <RouterLink
            to="/"
            class="nav-link"
            active-class="active"
          >
            Home (Week 5)
          </RouterLink>
        </li>

        <li v-if="isAuthenticated" class="nav-item">
          <RouterLink
            to="/about"
            class="nav-link"
            active-class="active"
          >
            About
          </RouterLink>
        </li>

        <li class="nav-item">
          <RouterLink
            to="/add-book"
            class="nav-link"
            active-class="active"
          >
            Add Book (W9)
          </RouterLink>
        </li>

        <li class="nav-item">
          <RouterLink
            to="/getbookcount"
            class="nav-link"
            active-class="active"
          >
            Get Book Count
          </RouterLink>
        </li>

        <li class="nav-item">
          <RouterLink
            to="/WeatherCheck"
            class="nav-link"
            active-class="active"
          >
            Get Weather
          </RouterLink>
        </li>

        <li class="nav-item">
          <RouterLink
            to="/CountBookAPI"
            class="nav-link"
            active-class="active"
          >
            Count Book API
          </RouterLink>
        </li>

        <li class="nav-item">
          <RouterLink
            to="/GetAllBookAPI"
            class="nav-link"
            active-class="active"
          >
            Get All Books API
          </RouterLink>
        </li>

        <li v-if="isAuthenticated" class="nav-item ms-2">
          <button
            type="button"
            class="btn btn-outline-danger"
            @click="handleLogout"
          >
            Logout
          </button>
        </li>

        <li v-else class="nav-item">
          <RouterLink
            to="/login"
            class="nav-link"
            active-class="active"
          >
            Login
          </RouterLink>
        </li>
      </ul>
    </header>
  </div>
</template>
