import { useLocalStorage } from "@vueuse/core";
import { useRouter } from "vue-router";

// user data persisted to local storage
const tokenInLocalStorage = useLocalStorage("deskree_token", null);
const userIdInLocalStorage = useLocalStorage("deskree_user_uid", null);
const loggedInUser = ref(null);
const loggedInUserInit = ref(false);
const onAuthStateChangeCallbacks = ref([]);
watch(loggedInUser, () => {
  onAuthStateChangeCallbacks.value.forEach((callback) => {
    callback(loggedInUser.value);
  });
});

export function useDeskree() {
  const router = useRouter();

  // api configuration
  const baseURL = useRuntimeConfig().public.deskreeBaseUrl;

  // login the user saved in local storage when page loads
  onMounted(() => {
    if (
      tokenInLocalStorage.value &&
      userIdInLocalStorage.value &&
      !loggedInUser.value &&
      !loggedInUserInit.value
    ) {
      initUser(userIdInLocalStorage.value);
      loggedInUserInit.value = true;
    }
  });

  /**
   * Auth functions exposed from composable
   */
  const auth = {
    onAuthStateChange(callback) {
      onAuthStateChangeCallbacks.value.push(callback);
    },
    async signUp({ email, password }) {
      // hit signup endpoint on deskree
      const res = await $fetch("/auth/accounts/signup", {
        method: "POST",
        baseURL,
        body: { email, password },
      });
      const user = res.data;

      // store the token locally
      userIdInLocalStorage.value = user.uid;
      initToken(user.idToken);

      // create the users one and only cart
      const cart = await dbRestRequest("/carts", "POST", {
        products: JSON.stringify([]),
      });

      // connect that cart to the user
      dbRestRequest(`/users/${user.uid}`, "PATCH", {
        cartId: cart.data.uid,
      });

      user.cart = cart.data;
      user.cartId = cart.data.uid;
      initUser(user);
    },

    async login({ email, password }) {
      // call login endpoint
      const res = await $fetch("/auth/accounts/sign-in/email", {
        baseURL,
        method: "POST",
        body: { email, password },
      });

      // save user id and token to local storage
      userIdInLocalStorage.value = res.data.uid;
      initToken(res.data.idToken);

      // initialize the user with cart data
      await initUser(res.data.uid);
    },

    logout() {
      userIdInLocalStorage.value = null;
      tokenInLocalStorage.value = null;
      loggedInUser.value = null;
    },
  };

  /**
   * User function exposed from the composable
   */
  const user = {
    login() {
      return auth.login();
    },
    logout() {
      return auth.logout();
    },
    get() {
      return loggedInUser.value;
    },
    async updateCart(products) {
      if (!loggedInUser.value || !loggedInUser.value.cartId) return;

      // persist user's cart data to Deskree here

      // example of what the return from Deskree will look like
      return {
        data: {
          author: "4xsOPtHHiSMI06OHT5gvDnwmLuo2",
          createdAt: "2022-08-19T06:24:47-05:00",
          products: JSON.parse("[]"),
          updatedAt: "2022-08-22T11:03:07-05:00",
        },
      };
    },
    async getCart() {
      // get the user's persisted cart from Deskree here
      return [];
    },
  };

  /**
   * Reviews functions exposed from the composable
   */
  const reviews = {
    get(productId) {
      // make request to get reviews for a product here
    },
    submit({ text, rating, title, product_id }) {
      // make request to add a new review here
    },
  };

  // private composable functions
  function initToken(token) {
    tokenInLocalStorage.value = token;
  }

  async function initUser(userIdOrUser) {
    if (typeof userIdOrUser === "string") {
      try {
        const res = await dbRestRequest(`/users/${userIdOrUser}`);
        res.data.cart = await user.getCart();
        loggedInUser.value = res.data;
      } catch (err) {
        if (!err.body) return;
        const tokenHasExpired = err.body.errors.find(
          (e) =>
            e.code === "403" && e.detail.startsWith("Auth token has expired")
        );
        if (tokenHasExpired) {
          router.push("/logout");
        }
      }
    } else {
      loggedInUser.value = userIdOrUser;
    }
  }

  function integrationsRestRequest(endpoint, method = "GET", body) {
    endpoint = endpoint.replace(/^\//, "");
    return authorizedRestRequest(`/integrations/${endpoint}`, method, body);
  }

  function dbRestRequest(endpoint, method = "GET", body) {
    endpoint = endpoint.replace(/^\//, "");
    return authorizedRestRequest(`/rest/collections/${endpoint}`, method, body);
  }

  function authorizedRestRequest(endpoint, method = "GET", body) {
    endpoint = endpoint.replace(/^\//, "");
    const options = {
      baseURL,
      method,
      headers: {
        Authorization: `Bearer ${tokenInLocalStorage.value}`,
      },
    };
    if (body && method !== "GET") options.body = body;
    return $fetch(endpoint, options);
  }

  return {
    auth,
    user,
    reviews,
    tokenInLocalStorage,
    loggedInUser,
  };
}
