<script setup>
const router = useRouter();
const alerts = useAlertsStore();
definePageMeta({
  layout: "form-focus",
});

const deskree = useDeskree();

const form = reactive({
  email: "",
  password: "",
  password_confirm: "",
});

const loading = ref(false);
async function handleRegistration(e) {
  loading.value = true;
  try {
    await deskree.auth.signUp(form);
    useRouter().push("/");
  } catch (err) {
    alerts.error("Error registering, please contact support");
  } finally {
    loading.value = false;
  }
}
</script>
<template>
  <div>
    <h2 class="card-title mb-5">Register</h2>
    <FormKit
      type="form"
      :config="{ validationVisibility: 'submit' }"
      @submit="handleRegistration"
      :actions="false"
      v-model="form"
    >
      <FormKit
        type="text"
        label="Email"
        name="email"
        validation="required|email"
      />

      <FormKit
        type="password"
        name="password"
        label="Password"
        validation="required"
      />
      <FormKit
        type="password"
        name="password_confirm"
        label="Confirm password"
        validation="required|confirm"
        validation-label="Password"
      />
      <AppButton class="btn-primary" :loading="loading">Register</AppButton>
    </FormKit>
  </div>
</template>
