<script setup>
const { siteName } = useAppConfig();
const deskree = useDeskree();
const loggedInUser = computed(() => deskree.loggedInUser.value);

const cartStore = useCartStore();
</script>

<template>
  <div class="shadow-md navbar bg-base-100">
    <div class="flex-1">
      <NuxtLink class="text-xl normal-case btn btn-ghost" to="/">{{
        siteName
      }}</NuxtLink>
    </div>
    <!-- Right Side -->
    <div class="flex-none">
      <div class="dropdown dropdown-end">
        <CartIcon :loading="false" :count="cartStore.totalCount" />
        <div
          tabindex="0"
          class="mt-3 shadow card card-compact dropdown-content w-52 bg-base-100"
        >
          <div class="card-body">
            <span class="text-lg font-bold"
              >{{ cartStore.totalCount }} Items</span
            >
            <span class="text-info"
              >Subtotal:
              <ProductPrice :price="cartStore.subTotal" />
            </span>
            <div class="card-actions">
              <NuxtLink :to="{ name: 'cart' }">
                <button class="btn btn-primary btn-block">View cart</button>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!--Buttons for UN-logged In Users-->
      <div v-if="!loggedInUser">
        <NuxtLink
          to="/login"
          class="ml-5 border-2 border-gray-100 btn btn-ghost btn-sm"
          >Login</NuxtLink
        >
        <NuxtLink to="/register" class="ml-2 btn btn-primary btn-sm"
          >Register</NuxtLink
        >
      </div>

      <!--UI for logged In Users-->
      <div v-else class="dropdown dropdown-end">
        <label tabindex="0" class="ml-5 btn btn-sm">
          <button>{{ loggedInUser.email }}</button>
        </label>
        <ul
          tabindex="0"
          class="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
        >
          <li>
            <a class="justify-between">
              Profile
              <span class="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li><NuxtLink to="/logout">Logout</NuxtLink></li>
        </ul>
      </div>
    </div>
  </div>
</template>
