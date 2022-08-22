<script setup>
defineProps({
  heatLevel: String,
});
const heatMap = {
  Hot: "🔥🔥🔥",
  Medium: "🔥🔥",
  Mild: "🔥",
};
</script>
<template>
  <span>
    {{ heatLevel ? heatMap[heatLevel] : "" }}
  </span>
</template>
