<script setup>
import { useDateFormat } from "@vueuse/core";
const props = defineProps({
  review: {
    type: Object,
    required: true,
  },
});
const date = useDateFormat(new Date(props.review.createdAt), "MM-YYYY");
</script>
<template>
  <div class="card border-2 border-gray-200 rounded-md">
    <div class="card-body">
      <div class="card-actions justify-between text-sm">
        <span>{{ "⭐️".repeat(review.rating) }}</span>
        <div>{{ date }}</div>
      </div>
      <h2 class="card-title">{{ review.title }}</h2>
      <p>
        {{ review.text }}
      </p>
    </div>
  </div>
</template>
