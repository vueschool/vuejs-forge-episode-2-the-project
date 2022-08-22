<template>
  <header>
    <NuxtLink to="/">
      <strong>My Store</strong>
    </NuxtLink>

    <div>
      <button class="snipcart-customer-signin">My account</button>
      <button class="snipcart-checkout">
        Cart <span class="snipcart-items-count"></span>
      </button>
    </div>
  </header>
</template>

<style scoped>
header {
  padding: 10px;
  background: gray;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.4rem;
}
</style>
