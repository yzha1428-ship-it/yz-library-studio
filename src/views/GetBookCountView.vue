<script setup>
import { ref } from 'vue';
import axios from 'axios';

import { getFunctionUrl } from '../services/bookApi';

const count = ref(null);
const error = ref('');
const loading = ref(false);

const getBookCount = async () => {
  count.value = null;
  error.value = '';
  loading.value = true;

  try {
    // Week 9 explicitly requires Axios, await, and an HTTP Function URL.
    const response = await axios.get(getFunctionUrl('countBooks'), {
      timeout: 10000
    });
    const data = response.data;

    if (!Number.isInteger(data.count) || data.count < 0) {
      throw new Error('The Cloud Function returned an invalid book count.');
    }

    count.value = data.count;
  } catch (requestError) {
    error.value = requestError.message || 'Could not get the book count.';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <section class="container py-5 text-center">
    <p class="text-uppercase text-muted small mb-2">Week 9.1</p>
    <h1>Book Counter</h1>
    <p class="lead mx-auto counter-copy">
      This Vue page calls the deployed <code>countBooks</code> HTTP Cloud
      Function with Axios.
    </p>

    <button class="btn btn-primary" type="button" :disabled="loading" @click="getBookCount">
      {{ loading ? 'Getting count…' : 'Get Book Count' }}
    </button>

    <p v-if="count !== null" class="alert alert-success mt-4 mx-auto counter-result" role="status">
      Total number of books: {{ count }}
    </p>
    <p v-else-if="error" class="alert alert-danger mt-4 mx-auto counter-result" role="alert">
      {{ error }}
    </p>
  </section>
</template>

<style scoped>
.counter-copy,
.counter-result {
  max-width: 44rem;
}
</style>
