<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import {
  DEMO_PASSWORD,
  DEMO_USERNAME,
  login
} from '../auth';

const route = useRoute();
const router = useRouter();

const username = ref('');
const password = ref('');

const showAccessDenied = computed(
  () => route.query.denied === 'true'
);

const requestedPath = computed(() => {
  const redirect = route.query.redirect;

  if (
    typeof redirect === 'string' &&
    redirect.startsWith('/') &&
    !redirect.startsWith('//')
  ) {
    return redirect;
  }

  return '/about';
});

const handleLogin = async () => {
  if (login(username.value, password.value)) {
    await router.push(requestedPath.value);
    return;
  }

  await router.push({
    name: 'AccessDenied',
    query: {
      redirect: requestedPath.value
    }
  });
};
</script>

<template>
  <section class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-5">
        <h1 class="text-center mb-4">Member Login</h1>

        <div
          v-if="showAccessDenied"
          class="alert alert-warning"
          role="alert"
        >
          <strong>Access denied.</strong>
          Please log in to view the protected About page.
        </div>

        <form
          class="card card-body shadow-sm"
          @submit.prevent="handleLogin"
        >
          <div class="mb-3">
            <label for="login-username" class="form-label">
              Username
            </label>
            <input
              id="login-username"
              v-model="username"
              type="text"
              class="form-control"
              autocomplete="username"
              required
            >
          </div>

          <div class="mb-3">
            <label for="login-password" class="form-label">
              Password
            </label>
            <input
              id="login-password"
              v-model="password"
              type="password"
              class="form-control"
              autocomplete="current-password"
              required
            >
          </div>

          <button type="submit" class="btn btn-primary">
            Log in
          </button>
        </form>

        <div class="alert alert-info mt-3 mb-0">
          <strong>Week 5 studio test credentials</strong><br>
          Username: <code>{{ DEMO_USERNAME }}</code><br>
          Password: <code>{{ DEMO_PASSWORD }}</code>
        </div>

        <p class="small text-muted mt-2 mb-0">
          These credentials are hardcoded only for this studio prototype.
          A production application would authenticate on a trusted server.
        </p>
      </div>
    </div>
  </section>
</template>
