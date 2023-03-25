import { defineStore, acceptHMRUpdate } from "pinia";
import * as contentful from "contentful";

export const useProductStore = defineStore("ProductStore", {
  state: () => {
    // const route = useRoute();
    return {
      /**
       * The listing of all the products
       */
      products: [],

      /**
       * Different ways of fetching the listing of products (filters, order, search)
       */
      filters: {
        "fields.heatLevel": "",
        order: "",
        query: "",
      },

      /**
       * A single project to show all the details of
       */
      singleProduct: null,
    };
  },
  getters: {
    activeFilters() {
      // TODO Note : stringify and parse is a hack to create clones. And Objects.entries, and Objects.fromEntries helps you interact with 
      // objects as arrays and easily access their attributes. 
      const clone = JSON.parse(JSON.stringify(this.filters));
      // remove blank object properties
      return Object.fromEntries(
        // TODO Note : The underscore just means I don't care what's in their, I just want to loop through them
        Object.entries(clone).filter(([_, v]) => v != null)
      );
    },
  },
  actions: {
    async fetchProducts() {
      // TODO read through the documentation of the contentful API to understand it better 
      const {$contentful} = useNuxtApp();
      const productsFound = await $contentful.getEntries({
        content_type: "product",
        ...this.activeFilters,
      });
      this.products = productsFound.items;
      return this.products;
    },
    async fetchProduct(id) {
      const products = await this.fetchProducts();
      this.singleProduct = products.find((p) => {
        return p.sys.id === id;
      });
      return this.singleProduct;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot));
}
