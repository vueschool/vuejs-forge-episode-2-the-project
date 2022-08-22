<script setup lang="ts">
defineProps<{
  product: any;
}>();
</script>

<template>
  <NuxtLink
    class="block product-card"
    :to="{ name: 'products-id', params: { id: product.sys.id } }"
  >
    <div class="card h-full bg-base-100 shadow-xl relative">
      <div class="absolute top-0 right-0 p-5">
        <ProductHeat :heatLevel="product.fields.heatLevel" />
      </div>
      <figure>
        <img
          :src="product.fields.image[0].fields?.file.url"
          :alt="product.fields.image[0].fields?.file.description"
        />
      </figure>
      <div class="card-body">
        <h2 class="justify-between flex">
          <span class="w-3/5"> {{ product.fields.name }} </span>
          <small class="w-2/5 p-1 badge badge-outline">
            <ProductPrice :price="product.fields.price" />
          </small>
        </h2>
        <p
          class="text-sm max-h-5 overflow-ellipsis overflow-hidden whitespace-nowrap"
        >
          {{ product.fields.summary }}
        </p>
        <div class="card-actions justify-center mt-3">
          <button class="btn btn-primary">View Item</button>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
img {
  width: 100%;
  height: 200px;
  object-fit: contain;
}
</style>
