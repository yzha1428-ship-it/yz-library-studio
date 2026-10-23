<script setup>
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';

import { getFunctionUrl } from '../services/bookApi';

const jsondata = ref(null);
const error = ref('');

const formattedJson = computed(() => JSON.stringify(jsondata.value, null, 2));

const getAllBookAPI = async () => {
  error.value = '';

  try {
    // This is an API view, so it renders the HTTP response data as JSON.
    const response = await axios.get(getFunctionUrl('getAllBooks'), {
      timeout: 10000
    });
    jsondata.value = response.data;
  } catch (requestError) {
    error.value = requestError.message || 'Could not load the all-books API.';
  }
};

onMounted(getAllBookAPI);
</script>

<template>
  <main class="api-document" aria-labelledby="all-books-api-title">
    <h1 id="all-books-api-title" class="visually-hidden">Get All Book API</h1>
    <pre v-if="jsondata">{{ formattedJson }}</pre>
    <p v-else-if="error" class="api-error">{{ error }}</p>
    <p v-else>Loading all-books API…</p>
  </main>
</template>

<style scoped>
.api-document {
  margin: 2rem auto;
  max-width: 58rem;
  padding: 0 1rem;
}

pre {
  margin: 0;
  white-space: pre-wrap;
}

.api-error {
  color: #b42318;
}
</style>
