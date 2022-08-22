import { defineStore, acceptHMRUpdate } from "pinia";
export const useCartStore = defineStore("CartStore", {
  state: () => {
    return {
      products: [],
      taxRate: 0.1,
    };
  },
  getters: {
    count: (state) => {
      return state.products.length;
    },
    isEmpty() {
      return this.count === 0;
    },
    subtotal: (state) => {
      return state.products.reduce((p, product) => {
        return product?.fields?.price
          ? product.fields.price * product.count + p
          : p;
      }, 0);
    },
    taxTotal: (state) => state.subtotal * state.taxRate,
    total: (state) => state.taxTotal + state.subtotal,
  },
  actions: {
    removeProducts(productIds) {
      this.products = this.products.filter(
        (p) => !productIds.includes(p.sys.id)
      );
    },
    addProduct(product, count) {
      const existingProduct = this.products.find(
        (p) => p.sys.id === product.sys.id
      );
      if (existingProduct) {
        existingProduct.count += count;
      } else {
        this.products.push({ ...product, count });
      }
      return count;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
