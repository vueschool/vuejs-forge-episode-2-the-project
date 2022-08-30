export const useCartStore = defineStore("CartStore", {
  state: () => ({
    items: [] as any[],
  }),

  getters: {
    totalCount: (state) =>
      state.items.reduce((acc, item) => acc + item.amount, 0),

    subTotal: (state) =>
      state.items.reduce(
        (acc, item) => acc + item.item.fields.price * item.amount,
        0
      ),

    taxTotal(): number {
      return this.subTotal * 0.1;
    },

    total(): number {
      return this.subTotal + this.taxTotal;
    },
  },

  actions: {
    addToCart(item: any) {
      const existingItem = this.items.find(
        (i) => i.item.sys.id === item.sys.id
      );
      if (existingItem) {
        existingItem.amount++;
      } else {
        this.items.push({ item, amount: 1 });
      }
    },

    removeFromCart(itemId: any) {
      const index = this.items.findIndex((i) => i.item.sys.id === itemId);
      if (index > -1) {
        this.items.splice(index, 1);
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
