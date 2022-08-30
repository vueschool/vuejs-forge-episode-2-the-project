<script setup>
const selected = ref([]);
const checkAll = ref();

const cartStore = useCartStore();

async function handleCheckout() {
  console.log("checking out");
}

function removeSelectedItems() {
  for (const id of selected.value) {
    cartStore.removeFromCart(id);
  }

  selected.value = [];
}
</script>

<template>
  <div class="m-10">
    <h1 class="mb-5 text-3xl font-bold">Your Cart</h1>
    <div class="w-full md:flex">
      <div class="md:w-3/4">
        <!-- Use this markup to display an empty cart -->
        <div v-if="!cartStore.items.length" class="pt-10 italic text-center">
          Cart is empty
        </div>
        <div v-else class="overflow-x-auto">
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
                <tr v-for="({ item, amount }, i) in cartStore.items">
                  <th>
                    <label>
                      <input
                        v-model="selected"
                        type="checkbox"
                        class="checkbox"
                        @change="checkAll.checked = false"
                        :value="item.sys.id"
                      />
                    </label>
                  </th>
                  <td>
                    <div class="flex items-center space-x-3">
                      <div class="avatar">
                        <div class="w-12 h-12 mask mask-squircle">
                          <img
                            :src="item.fields.image[0].fields.file.url"
                            :alt="item.fields.image[0].fields.title"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="font-bold">
                      {{ item.fields.name }}
                    </div>
                    <ProductHeat heat-level="Mild" />
                  </td>
                  <td>
                    <ProductPrice :price="item.fields.price" />
                  </td>

                  <td>
                    <input
                      class="w-20 input input-bordered"
                      type="number"
                      min="0"
                      v-model="cartStore.items[i].amount"
                    />
                  </td>
                  <th>
                    <NuxtLink
                      :to="{
                        name: 'products-id',
                        params: { id: item.sys.id },
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
              @click="removeSelectedItems"
            >
              Remove Selected
            </button>
          </div>
        </div>
      </div>

      <div class="pl-5 md:w-1/4">
        <div class="card bg-slate-50">
          <div class="card-body">
            <ul>
              <li>
                <strong>Subtotal</strong>:
                <ProductPrice :price="cartStore.subTotal" />
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
            <div class="justify-end w-full card-actions">
              <button class="w-full btn btn-primary" @click="handleCheckout">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
