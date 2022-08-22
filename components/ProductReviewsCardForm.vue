<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});
const form = reactive({
  title: "",
  text: "",
  rating: 5,
});
</script>
<template>
  <div>
    <FormKit
      type="form"
      :config="{ validationVisibility: 'submit' }"
      @submit="$emit('submitReview', form)"
      :actions="false"
      v-model="form"
    >
      <FormKit
        type="number"
        label="Rating"
        name="rating"
        validation="required"
      />
      <FormKit type="text" label="Title" name="title" validation="required" />

      <FormKit
        type="textarea"
        name="text"
        label="Review"
        validation="required"
      />
      <AppButton class="btn-primary" :loading="loading"
        >Submit Review</AppButton
      >
    </FormKit>
  </div>
</template>
