<script setup>
const cartStore = useCartStore();
const orderedProducts = ref([]);
const orderedTotal = ref(0);
const loading = ref(true);
const unwatch = watch(
  () => cartStore.isFirstLoad,
  (b) => {
    if (!b) {
      orderedProducts.value = JSON.parse(JSON.stringify(cartStore.products));
      orderedTotal.value = cartStore.subtotal;

      // reset the cart
      cartStore.reset();
      unwatch();
      loading.value = false;
    }
  }
);
</script>
<template>
  <div v-if="loading" class="flex justify-center items-center mt-10">
    <AppSpinner />
  </div>

  <div v-else class="mt-10 max-w-6xl mx-auto p-5">
    <h1 class="text-3xl">Thank you for your purchase!</h1>
    <h2>Order Summary</h2>
    <ul class="ml-5 list-inside list-disc">
      <li v-for="product in orderedProducts" :key="product.sys.id">
        {{ product.fields.name }}
      </li>
    </ul>
    <strong>Total: </strong>${{ orderedTotal / 100 }}
  </div>
</template>
