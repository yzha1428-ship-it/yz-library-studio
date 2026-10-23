<script setup>
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY?.trim();
const city = ref('');
const weatherData = ref(null);
const error = ref('');
const loading = ref(false);

const temperature = computed(() => (
  weatherData.value ? weatherData.value.main.temp : null
));

const iconUrl = computed(() => (
  weatherData.value
    ? `https://openweathermap.org/img/wn/${weatherData.value.weather[0].icon}@2x.png`
    : ''
));

const fetchWeatherData = async (url) => {
  if (!apiKey) {
    error.value = 'Add VITE_OPENWEATHER_API_KEY to .env.local, then restart Vite.';
    return;
  }

  error.value = '';
  loading.value = true;

  try {
    const response = await axios.get(url);
    weatherData.value = response.data;
  } catch (requestError) {
    weatherData.value = null;
    error.value = requestError.message || 'Could not load weather data.';
  } finally {
    loading.value = false;
  }
};

const fetchCurrentLocationWeather = () => {
  if (!navigator.geolocation) {
    error.value = 'This browser does not provide geolocation. Search for a city instead.';
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
      await fetchWeatherData(url);
    },
    () => {
      error.value = 'Location permission was not granted. Search for a city instead.';
    }
  );
};

const searchByCity = async () => {
  const query = city.value.trim();

  if (!query) {
    error.value = 'Enter a city before searching.';
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(query)}&appid=${apiKey}&units=metric`;
  await fetchWeatherData(url);
};

onMounted(fetchCurrentLocationWeather);
</script>

<template>
  <section class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-7">
        <p class="text-uppercase text-muted small mb-2">Week 10.1 and 10.2</p>
        <h1 class="mb-3">Weather App</h1>
        <p class="lead">
          Current-location weather loads automatically. You can also search a
          city, for example <code>Clayton, AU</code>.
        </p>

        <form class="input-group mb-3" @submit.prevent="searchByCity">
          <label class="visually-hidden" for="weather-city">City</label>
          <input
            id="weather-city"
            v-model="city"
            class="form-control"
            type="search"
            placeholder="Enter city name"
            autocomplete="address-level2"
          >
          <button class="btn btn-primary" type="submit" :disabled="loading">
            Search
          </button>
        </form>

        <p v-if="!apiKey" class="small text-muted">
          Add <code>VITE_OPENWEATHER_API_KEY</code> to <code>.env.local</code>
          and restart Vite before retrieving weather data.
        </p>

        <p v-if="loading" class="alert alert-info" role="status">Loading weather…</p>
        <p v-else-if="error" class="alert alert-warning" role="alert">{{ error }}</p>

        <article v-else-if="weatherData" class="card shadow-sm weather-card">
          <div class="card-body text-center">
            <h2 class="h3">{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
            <img class="weather-icon" :src="iconUrl" alt="Weather icon">
            <p class="display-6 mb-2">{{ temperature }} °C</p>
            <p class="mb-0 text-capitalize">{{ weatherData.weather[0].description }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.weather-card {
  max-width: 32rem;
  margin: 0 auto;
}

.weather-icon {
  display: block;
  height: 100px;
  margin: 0.5rem auto;
  width: 100px;
}
</style>
