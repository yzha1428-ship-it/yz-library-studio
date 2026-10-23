<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center mb-2">
          🗄️ W5. Library Registration Form
        </h1>
        <p class="text-center text-muted mb-4">
          Let's build some more advanced features into our form.
        </p>

        <!--
          novalidate disables the browser's native validation pop-ups.
          The final version uses Vue validation messages instead.
        -->
        <form @submit.prevent="submitForm" novalidate>
          <!-- Username and gender -->
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="username" class="form-label">
                Username
              </label>

              <input
                id="username"
                v-model="formData.username"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.username }"
                @blur="validateName(true)"
                @input="validateName(false)"
              >

              <div
                v-if="errors.username"
                class="text-danger mt-1"
              >
                {{ errors.username }}
              </div>
            </div>

            <div class="col-md-6">
              <label for="gender" class="form-label">
                Gender
              </label>

              <select
                id="gender"
                v-model="formData.gender"
                class="form-select"
                :class="{ 'is-invalid': errors.gender }"
                @blur="validateGender(true)"
                @change="validateGender(true)"
              >
                <option value="" disabled>
                  Please select a gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              <div
                v-if="errors.gender"
                class="text-danger mt-1"
              >
                {{ errors.gender }}
              </div>
            </div>
          </div>

          <!-- Password and confirm password -->
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="password" class="form-label">
                Password
              </label>

              <input
                id="password"
                v-model="formData.password"
                type="password"
                class="form-control"
                :class="{ 'is-invalid': errors.password }"
                autocomplete="new-password"
                @blur="validatePassword(true)"
                @input="validatePassword(false)"
              >

              <div
                v-if="errors.password"
                class="text-danger mt-1"
              >
                {{ errors.password }}
              </div>
            </div>

            <div class="col-md-6">
              <label for="confirm-password" class="form-label">
                Confirm password
              </label>

              <input
                id="confirm-password"
                v-model="formData.confirmPassword"
                type="password"
                class="form-control"
                :class="{ 'is-invalid': errors.confirmPassword }"
                autocomplete="new-password"
                @blur="validateConfirmPassword(true)"
              >

              <div
                v-if="errors.confirmPassword"
                class="text-danger mt-1"
              >
                {{ errors.confirmPassword }}
              </div>
            </div>
          </div>

          <!-- Australian resident -->
          <div class="mb-3">
            <div class="form-check">
              <input
                id="isAustralian"
                v-model="formData.isAustralian"
                type="checkbox"
                class="form-check-input"
                @change="validateResident(true)"
              >

              <label
                class="form-check-label"
                for="isAustralian"
              >
                Australian Resident?
              </label>
            </div>

            <div
              v-if="errors.resident"
              class="text-danger mt-1"
            >
              {{ errors.resident }}
            </div>
          </div>

          <!-- Reason for joining -->
          <div class="mb-3">
            <label for="reason" class="form-label">
              Reason for joining
            </label>

            <textarea
              id="reason"
              v-model="formData.reason"
              class="form-control"
              :class="{ 'is-invalid': errors.reason }"
              rows="3"
              @blur="validateReason(true)"
              @input="validateReason(false)"
            ></textarea>

            <div
              v-if="errors.reason"
              class="text-danger mt-1"
            >
              {{ errors.reason }}
            </div>

            <div
              v-if="friendMessage"
              class="text-success mt-1"
            >
              {{ friendMessage }}
            </div>
          </div>

          <!-- Suburb uses one-way binding for the Vue DevTools activity. -->
          <div class="mb-3">
            <label for="suburb" class="form-label">
              Suburb
            </label>

            <input
              id="suburb"
              :value="formData.suburb"
              type="text"
              class="form-control"
            >
          </div>

          <!-- Buttons -->
          <div class="text-center">
            <button
              type="submit"
              class="btn btn-primary me-2"
            >
              Submit
            </button>

            <button
              type="button"
              class="btn btn-secondary"
              @click="clearForm"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- PrimeVue DataTable -->
    <section
      v-if="submittedUsers.length > 0"
      class="mt-5"
    >
      <h2 class="text-center mb-3">
        Submitted User Information
      </h2>

      <DataTable
        :value="submittedUsers"
        stripedRows
        showGridlines
        tableStyle="min-width: 50rem"
      >
        <Column
          field="username"
          header="Username"
        />

        <Column
          field="password"
          header="Password"
        />

        <Column header="Australian Resident">
          <template #body="slotProps">
            {{ slotProps.data.isAustralian ? 'Yes' : 'No' }}
          </template>
        </Column>

        <Column
          field="gender"
          header="Gender"
        />

        <Column
          field="reason"
          header="Reason"
        />
      </DataTable>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  isAustralian: false,
  gender: '',
  reason: '',
  suburb: 'Clayton'
});

const errors = ref({
  username: null,
  password: null,
  confirmPassword: null,
  resident: null,
  gender: null,
  reason: null
});

const submittedUsers = ref([]);
const friendMessage = ref('');

/*
 * Validation 1: Username
 * Username must contain at least 3 characters.
 */
const validateName = (blur) => {
  const username = formData.value.username.trim();

  if (username.length < 3) {
    if (blur) {
      errors.value.username =
        'Name must be at least 3 characters.';
    }
  } else {
    errors.value.username = null;
  }
};

/*
 * Validation 2: Password
 * Password must:
 * - contain at least 8 characters
 * - contain an uppercase letter
 * - contain a lowercase letter
 * - contain a number
 * - contain a special character
 */
const validatePassword = (blur) => {
  const password = formData.value.password;

  if (password.length < 8) {
    if (blur) {
      errors.value.password =
        'Password must be at least 8 characters.';
    }
  } else if (!/[A-Z]/.test(password)) {
    if (blur) {
      errors.value.password =
        'Password must contain at least one uppercase letter.';
    }
  } else if (!/[a-z]/.test(password)) {
    if (blur) {
      errors.value.password =
        'Password must contain at least one lowercase letter.';
    }
  } else if (!/[0-9]/.test(password)) {
    if (blur) {
      errors.value.password =
        'Password must contain at least one number.';
    }
  } else if (!/[^A-Za-z0-9]/.test(password)) {
    if (blur) {
      errors.value.password =
        'Password must contain at least one special character.';
    }
  } else {
    errors.value.password = null;
  }
};

/*
 * Confirm password validation runs when the field loses focus
 * and again when the form is submitted.
 */
const validateConfirmPassword = (blur) => {
  const password = formData.value.password;
  const confirmPassword = formData.value.confirmPassword;

  if (!confirmPassword) {
    if (blur) {
      errors.value.confirmPassword =
        'Please confirm your password.';
    }
  } else if (password !== confirmPassword) {
    if (blur) {
      errors.value.confirmPassword =
        'Passwords do not match.';
    }
  } else {
    errors.value.confirmPassword = null;
  }
};

/*
 * Validation 3: Australian Resident
 */
const validateResident = (blur) => {
  if (!formData.value.isAustralian) {
    if (blur) {
      errors.value.resident =
        'Please confirm Australian residency.';
    }
  } else {
    errors.value.resident = null;
  }
};

/*
 * Validation 4: Gender
 */
const validateGender = (blur) => {
  if (!formData.value.gender) {
    if (blur) {
      errors.value.gender =
        'Please select a gender.';
    }
  } else {
    errors.value.gender = null;
  }
};

/*
 * Validation 5: Reason for joining
 * Reason must contain at least 10 characters.
 */
const validateReason = (blur) => {
  const reason = formData.value.reason.trim();

  friendMessage.value = /\bfriend\b/i.test(reason)
    ? 'Great to have a friend'
    : '';

  if (reason.length < 10) {
    if (blur) {
      errors.value.reason =
        'Reason must be at least 10 characters.';
    }
  } else {
    errors.value.reason = null;
  }
};

/*
 * Validate every required field before adding the record
 * to the PrimeVue DataTable.
 */
const submitForm = () => {
  validateName(true);
  validatePassword(true);
  validateConfirmPassword(true);
  validateResident(true);
  validateGender(true);
  validateReason(true);

  const isValid = Object
    .values(errors.value)
    .every((message) => !message);

  if (!isValid) {
    return;
  }

  submittedUsers.value.push({
    username: formData.value.username.trim(),
    password: formData.value.password,
    isAustralian: formData.value.isAustralian,
    gender: formData.value.gender,
    reason: formData.value.reason.trim()
  });
};

/*
 * Clear the form and validation messages.
 * Existing DataTable records are not deleted.
 */
const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    confirmPassword: '',
    isAustralian: false,
    gender: '',
    reason: '',
    suburb: 'Clayton'
  };

  errors.value = {
    username: null,
    password: null,
    confirmPassword: null,
    resident: null,
    gender: null,
    reason: null
  };

  friendMessage.value = '';
};
</script>

<style scoped>
section {
  overflow-x: auto;
}

.text-danger {
  font-size: 0.95rem;
}
</style>
