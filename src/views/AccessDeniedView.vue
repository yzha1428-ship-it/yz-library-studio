<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

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

const loginLocation = computed(() => ({
  name: 'Login',
  query: {
    redirect: requestedPath.value
  }
}));
</script>

<template>
  <section class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-7 text-center">
        <div class="alert alert-danger" role="alert">
          <h1 class="h3">Access Denied</h1>
          <p class="mb-0">
            The login details were not accepted. This page is available
            only to authenticated library members.
          </p>
        </div>

        <RouterLink
          :to="loginLocation"
          class="btn btn-primary me-2"
        >
          Return to Login
        </RouterLink>

        <RouterLink to="/" class="btn btn-outline-secondary">
          Return Home
        </RouterLink>
      </div>
    </div>
  </section>
</template>
