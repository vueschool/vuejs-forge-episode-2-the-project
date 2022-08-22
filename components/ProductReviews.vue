<script setup>
import groupBy from "lodash/groupBy";

const props = defineProps({
  productId: {
    type: String,
    required: true,
  },
});
const deskree = useDeskree();
const loggedIn = computed(() => !!deskree.loggedInUser.value);
const reviews = ref([]);
const status = ref("waiting"); // loading, loaded, error

// Math
const avg = computed(() =>
  (
    reviews.value.reduce((p, c) => p + c.rating, 0) / reviews.value.length
  ).toFixed(1)
);

const groupedReviews = computed(() => {
  return groupBy(reviews.value, "rating");
});

// Reviews cards
const showReviews = ref(false);
function handleShowReviewsToggle() {
  showReviews.value = !showReviews.value;
  showReviewForm.value = false;
}
async function loadReviews() {
  status.value = "loading";
  const res = await deskree.reviews.get(props.productId);
  reviews.value = res.data.map((review) => ({
    ...review.attributes,
  }));
  status.value = "loaded";
}

// Reviews form
const formSubmitting = ref(false);
const showReviewForm = ref(false);
function handleShowFormToggle() {
  showReviewForm.value = !showReviewForm.value;
  showReviews.value = false;
}

async function handleReviewSubmit(form) {
  if (!loggedIn.value) return;
  formSubmitting.value = true;
  const res = await deskree.reviews.submit({
    ...form,
    product_id: props.productId,
  });
  reviews.value.push(res.data);
  formSubmitting.value = false;
  showReviewForm.value = false;
}
</script>

<template>
  <div>
    <hr class="my-10" />
    <button @click="loadReviews" class="underline flex items-center">
      View Product Reviews
      <AppSpinner class="ml-3" size="sm" v-if="status === 'loading'" />
    </button>
  </div>

  <div class="my-10" v-if="status === 'loaded'">
    <h4 class="text-lg mb-5">Customer Reviews and Ratings</h4>
    <div class="flex items-center">
      <div class="card border-2 border-primary p-5">
        <div class="card-content" v-if="reviews.length">
          <span class="text-4xl">{{ avg }}</span>
          out of
          <span class="text-4xl">5</span>
          <div class="text-2xs text-gray-700">
            ({{ reviews.length }} Reviews)
          </div>
        </div>
        <div class="card-content text-center" v-else>
          <div class="text-lg bold text-primary">No Reviews Yet</div>
          <button class="text-sm underline" @click="showReviewForm = true">
            Be the first to write one!
          </button>
        </div>
      </div>
      <div class="pl-5">
        <div v-for="n in 5" class="text-xs flex items-center">
          {{ n }} Stars

          <input
            class="ml-2 mr-2"
            type="range"
            max="100"
            :value="
              groupedReviews[n]
                ? (groupedReviews[n].length / reviews.length) * 100
                : 0
            "
            disabled
          />
          ({{ groupedReviews[n]?.length || 0 }} Reviews)
        </div>
      </div>
    </div>
    <button
      v-if="loggedIn"
      class="underline my-5"
      @click="handleShowFormToggle()"
    >
      Write a Review
    </button>
    <NuxtLink v-if="!loggedIn" to="/login">
      <button class="underline my-5">Log in To Write a Review</button>
    </NuxtLink>
    <span class="text-gray-400 mx-2">|</span>
    <button class="underline my-5" @click="handleShowReviewsToggle">
      {{ showReviews ? "Hide All Reviews" : "Show All Reviews" }}
    </button>

    <div v-if="showReviews">
      <ProductReviewsCard
        v-for="review in reviews"
        :key="review.uid"
        :review="review"
      />
    </div>

    <ProductReviewsCardForm
      v-if="showReviewForm"
      @submitReview="handleReviewSubmit"
      :loading="formSubmitting"
    />
  </div>
</template>
