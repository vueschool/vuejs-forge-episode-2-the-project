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
      <div class="absolute top-0 left-5 p-2">
        <ProductHeat :heatLevel="product.fields.heatLevel" />
      </div>
      <small>
        <div class="absolute top-0 right-0 p-1 badge badge-outline">
          <ProductPrice :price="product.fields.price" />
        </div>
      </small>

      <figure>
        <img
          :src="product.fields.image[0].fields?.file.url"
          :alt="product.fields.image[0].fields?.file.description"
        />
      </figure>
      <div class="card-body">
        <h1 class="justify-between flex">
          <span class="w-5/5"> {{ product.fields.name }} </span>
        </h1>
        <p
          class="text-sm max-h-5 font-light overflow-ellipsis overflow-hidden whitespace-nowrap"
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
  h1 {
    font-size: 1.2rem;
    font-weight: 700;
  }
</style>
