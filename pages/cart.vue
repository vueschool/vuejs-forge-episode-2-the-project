<script setup>
const cartStore = useCartStore();
const selected = ref([]);
const checkAll = ref();
const loading = ref(false);

async function handleCheckout() {
  loading.value = true;
  const res = await $fetch("/api/cart", {
    method: "POST",
    body: {
      products: cartStore.products,
    },
  });
  window.location = res.url;
}
</script>
<template>
  <div class="m-10">
    <h1 class="text-3xl mb-5 font-bold">Your Cart</h1>
    <div class="md:flex w-full">
      <div class="md:w-3/4">
        <!-- Use this markup to display an empty cart -->
        <!-- <div  class="italic text-center pt-10">
          Cart is empty
        </div> -->
        <div class="overflow-x-auto">
          <div class="table w-full">
            <table class="w-full">
              <!-- head -->
              <thead>
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" class="checkbox" ref="checkAll" />
                    </label>
                  </th>
                  <th></th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Number of Items</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in cartStore.products" :key="product.sys.id">
                  <th>
                    <label>
                      <input
                        v-model="selected"
                        type="checkbox"
                        class="checkbox"
                        @change="checkAll.checked = false"
                        :value="product.sys.id"
                      />
                    </label>
                  </th>
                  <td>
                    <div class="flex items-center space-x-3">
                      <div class="avatar">
                        <div class="mask mask-squircle w-12 h-12">
                          <img
                            :src="product.fields.image[0].fields.file.url"
                            :alt="product.fields.image[0].fields.title"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="font-bold">
                      {{ product.fields.name }}
                    </div>
                    <ProductHeat :heat-level="product.fields.heatLevel" />
                  </td>
                  <td>
                    <ProductPrice :price="product.fields.price" />
                  </td>

                  <td>
                    <input
                      class="input input-bordered w-20"
                      type="number"
                      v-model="product.count"
                    />
                  </td>
                  <th>
                    <NuxtLink
                      :to="{
                        name: 'products-id',
                        params: { id: product.sys.id },
                      }"
                    >
                      <button class="btn btn-ghost btn-xs">details</button>
                    </NuxtLink>
                  </th>
                </tr>
              </tbody>
            </table>
            <button
              v-if="selected.length"
              class="text-sm text-red-500"
              @click="
                cartStore.removeProducts(selected);
                selected = [];
              "
            >
              Remove Selected
            </button>
          </div>
        </div>
      </div>

      <div class="md:w-1/4 pl-5">
        <div class="card bg-slate-50">
          <div class="card-body">
            <ul>
              <li>
                <strong>Subtotal</strong>:
                <ProductPrice :price="cartStore.subtotal" />
              </li>
              <li>
                <strong>Estimated Taxes </strong>:
                <ProductPrice :price="cartStore.taxTotal" />
              </li>
              <li>
                <strong>Total</strong>:
                <ProductPrice :price="cartStore.total" />
              </li>
            </ul>
            <div class="card-actions justify-end w-full">
              <AppButton
                class="btn-primary w-full"
                @click="handleCheckout"
                :loading="loading"
              >
                Checkout
              </AppButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
