<script setup>
import { computed, ref } from 'vue'

// Activity 1: Import JSON files (authors.json and bookstores.json)
import authors from '../assets/json/authors.json'
import bookstores from '../assets/json/bookstores.json'

// Activity 2.1: Use a computed property to get authors born after 1850
const modernAuthors = computed(() =>
  authors.filter((author) => author.birthYear > 1850),
)

// Activity 2.2: Use computed, flatMap and map to get every famous work title
const allFamousWorks = computed(() =>
  authors.flatMap((author) => author.famousWorks.map((work) => work.title)),
)

// Activity 4: This boolean changes when the user selects the button
const showMessage = ref(false)

// Task 2.2: Return true only for George Orwell
const isGeorgeOrwell = (author) => author.name === 'George Orwell'
</script>

<template>
  <main class="library-page">
    <header class="hero" aria-labelledby="page-title">
      <div>
        <p class="eyebrow">FIT5032 · Week 2 eFolio</p>
        <h1 id="page-title">Working with JSON Arrays</h1>
        <p class="hero-copy">
          Computed properties and Vue directives make this library data reactive.
        </p>
      </div>
      <div class="data-summary" aria-label="Imported JSON data summary">
        <strong>{{ authors.length }}</strong>
        <span>authors</span>
        <strong>{{ bookstores.length }}</strong>
        <span>bookstores</span>
      </div>
    </header>

    <section class="activity-card" aria-labelledby="activity-one-title">
      <div class="section-heading">
        <span class="activity-number">1 & 3.1</span>
        <div>
          <h2 id="activity-one-title">Imported authors</h2>
          <p>Iterating through the <code>authors.json</code> array with <code>v-for</code>.</p>
        </div>
      </div>

      <ul class="data-list">
        <li
          v-for="author in authors"
          :key="author.id"
          :title="isGeorgeOrwell(author) ? 'Highlighted author: George Orwell' : `Author: ${author.name}`"
          :class="{ 'author-highlight': isGeorgeOrwell(author) }"
          :style="
            isGeorgeOrwell(author)
              ? { borderLeftColor: '#f59e0b', backgroundColor: '#fff7d6' }
              : {}
          "
        >
          <span>
            <strong>{{ author.name }}</strong>
            <small>Born {{ author.birthYear }}</small>
          </span>
          <span v-if="isGeorgeOrwell(author)" class="highlight-badge">Highlighted author</span>
        </li>
      </ul>
    </section>

    <div class="two-column">
      <section class="activity-card" aria-labelledby="activity-two-title">
        <div class="section-heading">
          <span class="activity-number">2.1 & 3.2</span>
          <div>
            <h2 id="activity-two-title">Filtering Arrays</h2>
            <p>Authors born after 1850.</p>
          </div>
        </div>

        <ul class="data-list compact-list">
          <li v-for="author in modernAuthors" :key="author.id">
            <span>
              <strong>{{ author.name }}</strong>
              <small>{{ author.birthYear }}</small>
            </span>
          </li>
        </ul>
      </section>

      <section class="activity-card" aria-labelledby="activity-three-title">
        <div class="section-heading">
          <span class="activity-number">2.2 & 3.3</span>
          <div>
            <h2 id="activity-three-title">Mapping Arrays</h2>
            <p>All famous works from every author.</p>
          </div>
        </div>

        <ul class="works-list">
          <li v-for="work in allFamousWorks" :key="work">{{ work }}</li>
        </ul>
      </section>
    </div>

    <section class="activity-card toggle-card" aria-labelledby="activity-four-title">
      <div class="section-heading">
        <span class="activity-number">4.1</span>
        <div>
          <h2 id="activity-four-title">v-if & v-else</h2>
          <p>Toggle visibility based on a condition.</p>
        </div>
      </div>

      <button type="button" @click="showMessage = !showMessage">Toggle Message</button>
      <p v-if="showMessage" class="message success" role="status">
        You're a Vue superstar!
      </p>
      <p v-else class="message" role="status">Click the button to see a message.</p>
    </section>
  </main>
</template>
