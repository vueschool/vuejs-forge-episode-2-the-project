<script setup>
import * as marked from "marked";
const route = useRoute();
const productStore = useProductStore();
const cartStore = useCartStore();

const { data: product } = await useAsyncData(
  `product${route.params.id}`,
  async () => {
    if (route.params.id === "undefined") return productStore.singleProduct;
    await productStore.fetchProduct(route.params.id);
    return productStore.singleProduct;
  },
  {
    pick: ["fields", "sys"],
  }
);

const description = computed(() =>
  product.value ? marked.parse(product.value?.fields?.description) : null
);

function handleAddToCart(product) {
  cartStore.addToCart(product);
  useAlertsStore().success(product.fields.name + " added to cart");
}
</script>
<template>
  <div class="max-w-6xl mx-auto mt-10">
    <div v-if="product">
      <div class="sm:flex">
        <img
          class="object-contain mr-10 h-80 sm:w-1/3"
          :src="product?.fields.image[0].fields?.file.url"
          :alt="product?.fields.image[0].fields?.file.description"
        />
        <div class="px-10 sm:pl-0 sm:w-2/3">
          <h1 class="text-2xl">{{ product?.fields.name }}</h1>
          <h2>
            <ProductPrice :price="product.fields.price" />
            <ProductHeat :heatLevel="product.fields.heatLevel" />
          </h2>
          <div class="prose-sm prose">
            <p>{{ product.fields.summary }}</p>
          </div>

          <hr class="my-4" />

          <div class="mb-5 prose" v-html="description" />
          <button class="btn btn-primary" @click="handleAddToCart(product)">
            Add to cart
          </button>

          <ProductReviews :productId="product.sys.id" />
        </div>
      </div>
    </div>
  </div>
</template>
