<script setup>
import { computed, onBeforeUnmount, ref } from 'vue';
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';

import {
  db,
  firebaseSetupMessage,
  isFirebaseConfigured
} from '../services/firebaseClient';

const form = ref({
  name: '',
  isbn: ''
});
const formError = ref('');
const status = ref('idle');
const statusMessage = ref('');
const savedBook = ref(null);
let unsubscribeFromBook = null;

const canUseFirestore = computed(() => isFirebaseConfigured && db);

const stopListeningForBook = () => {
  if (unsubscribeFromBook) {
    unsubscribeFromBook();
    unsubscribeFromBook = null;
  }
};

onBeforeUnmount(stopListeningForBook);

const submitBook = async () => {
  if (status.value === 'saving' || status.value === 'waiting') {
    return;
  }

  stopListeningForBook();
  formError.value = '';
  statusMessage.value = '';
  savedBook.value = null;

  const name = form.value.name.trim();
  const isbn = Number(form.value.isbn);

  if (!name) {
    formError.value = 'Enter a book name.';
    return;
  }

  if (!Number.isSafeInteger(isbn) || isbn <= 0) {
    formError.value = 'ISBN must be a positive whole number.';
    return;
  }

  if (!canUseFirestore.value) {
    formError.value = firebaseSetupMessage;
    return;
  }

  status.value = 'saving';

  try {
    const bookReference = await addDoc(collection(db, 'books'), {
      name,
      isbn,
      createdAt: serverTimestamp()
    });

    status.value = 'waiting';
    statusMessage.value = 'Book created. Waiting for the Cloud Function to capitalise its name…';

    unsubscribeFromBook = onSnapshot(
      bookReference,
      (snapshot) => {
        const book = snapshot.data();

        if (!book) {
          return;
        }

        savedBook.value = {
          id: snapshot.id,
          isbn: book.isbn,
          name: book.name
        };

        if (book.name === name.toUpperCase()) {
          status.value = 'complete';
          statusMessage.value = 'Cloud Function complete: the Firestore book name is now uppercase.';
          stopListeningForBook();
        }
      },
      (error) => {
        status.value = 'error';
        statusMessage.value = `Could not observe the saved book: ${error.message}`;
        stopListeningForBook();
      }
    );
  } catch (error) {
    status.value = 'error';
    statusMessage.value = `Could not add the book: ${error.message}`;
  }
};
</script>

<template>
  <section class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-7">
        <p class="text-uppercase text-muted small mb-2">Week 9.2</p>
        <h1 class="mb-3">Add a Firestore Book</h1>
        <p class="lead">
          Add a mixed-case book name. The <code>capitaliseBook</code> Cloud
          Function updates its text field after Firestore creates the document.
        </p>

        <div v-if="!canUseFirestore" class="alert alert-warning" role="alert">
          {{ firebaseSetupMessage }}
        </div>

        <form class="card card-body shadow-sm" @submit.prevent="submitBook" novalidate>
          <div class="mb-3">
            <label class="form-label" for="book-name">Book name</label>
            <input
              id="book-name"
              v-model="form.name"
              class="form-control"
              type="text"
              maxlength="120"
              placeholder="e.g. the Hidden Forest"
              required
            >
          </div>

          <div class="mb-3">
            <label class="form-label" for="book-isbn">ISBN</label>
            <input
              id="book-isbn"
              v-model="form.isbn"
              class="form-control"
              type="number"
              min="1"
              step="1"
              placeholder="e.g. 9780143127741"
              required
            >
            <div class="form-text">The Week 8 schema preserves ISBN as a number.</div>
          </div>

          <p v-if="formError" class="text-danger mb-3" role="alert">
            {{ formError }}
          </p>

          <button
            class="btn btn-primary"
            type="submit"
            :disabled="status === 'saving' || status === 'waiting'"
          >
            {{ status === 'saving' ? 'Adding book…' : status === 'waiting' ? 'Waiting for function…' : 'Add book to Firestore' }}
          </button>
        </form>

        <div
          v-if="statusMessage"
          class="alert mt-4"
          :class="{
            'alert-info': status === 'waiting',
            'alert-success': status === 'complete',
            'alert-danger': status === 'error'
          }"
          role="status"
        >
          {{ statusMessage }}
        </div>

        <dl v-if="savedBook" class="card card-body mt-3 mb-0">
          <dt>Firestore document ID</dt>
          <dd><code>{{ savedBook.id }}</code></dd>
          <dt>Stored name</dt>
          <dd><strong>{{ savedBook.name }}</strong></dd>
          <dt>Stored ISBN (number)</dt>
          <dd>{{ savedBook.isbn }}</dd>
        </dl>
      </div>
    </div>
  </section>
</template>
