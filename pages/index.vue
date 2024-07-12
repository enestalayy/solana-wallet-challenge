<template>
  <div class="container">
    <Wallet />
  </div>
</template>

<script>
import Wallet from "~/components/wallet/Wallet.vue";
export default {
  components: {
    Wallet,
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
}
</style>
