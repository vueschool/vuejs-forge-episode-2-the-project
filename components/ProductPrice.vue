<script setup>
defineProps({
  price: {
    type: Number,
    required: true,
  },
});
</script>
<template>${{ price / 100 }}</template>
