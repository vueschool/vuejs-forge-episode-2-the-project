<script setup>
const alerts = useAlertsStore();
</script>
<template>
  <div class="toast toast-end">
    <TransitionGroup name="alerts">
      <div
        v-for="alert in alerts.items"
        :key="alert.id"
        :class="`alert alert-${alert.style} min-w-[200px] max-w-[400px]`"
      >
        <div class="flex">
          <div class="w-[20px] flex h-full justify-center items-center">
            <button @click="alerts.remove(alert.id)" class="px-5">x</button>
          </div>
          <div>{{ alert.message }}</div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>
<style scoped>
.alerts-enter-active,
.alerts-leave-active {
  transition: all 0.5s ease;
}
.alerts-enter-from,
.alerts-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
