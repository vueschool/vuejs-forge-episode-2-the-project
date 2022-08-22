<script setup>
const { auth } = useDeskree();
const router = useRouter();
await auth.logout();
onMounted(() => {
  window.location = "/login";
});
</script>
