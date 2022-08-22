<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <button class="btn btn-primary">
    <slot></slot
    ><AppSpinner v-if="loading" color="white" size="sm" class="ml-2" />
  </button>
</template>
