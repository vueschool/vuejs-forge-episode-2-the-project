<script setup>
defineProps({
  price: {
    type: Number,
    required: true,
  },
});
</script>
<template>${{ (price / 100).toFixed(2) }}</template>
