<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import BHeader from './components/BHeader.vue';

const route = useRoute();

// API routes deliberately return only JSON, as required in Week 10.3.
const showHeader = computed(
  () => !String(route.name || '').includes('API')
);
</script>

<template>
  <div class="main-container">
    <header v-if="showHeader">
      <BHeader />
    </header>

    <main class="main-box">
      <RouterView />
    </main>
  </div>
</template>

<style>
body {
  margin: 0;
  min-width: 320px;
}

.main-container {
  min-height: 100vh;
}

.main-box {
  padding-bottom: 3rem;
}
</style>
