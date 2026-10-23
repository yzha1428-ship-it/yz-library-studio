<script setup>
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';

import { getFunctionUrl } from '../services/bookApi';

const jsondata = ref(null);
const error = ref('');

const formattedJson = computed(() => JSON.stringify(jsondata.value, null, 2));

const getBookCountAPI = async () => {
  error.value = '';

  try {
    // The API page deliberately keeps only Axios response.data as JSON.
    const response = await axios.get(getFunctionUrl('countBooks'), {
      timeout: 10000
    });
    jsondata.value = response.data;
  } catch (requestError) {
    error.value = requestError.message || 'Could not load the book-count API.';
  }
};

onMounted(getBookCountAPI);
</script>

<template>
  <main class="api-document" aria-labelledby="count-api-title">
    <h1 id="count-api-title" class="visually-hidden">Count Book API</h1>
    <pre v-if="jsondata">{{ formattedJson }}</pre>
    <p v-else-if="error" class="api-error">{{ error }}</p>
    <p v-else>Loading book-count API…</p>
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
