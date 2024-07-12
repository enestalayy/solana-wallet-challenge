<script setup>
import { WalletMultiButton } from "solana-wallets-vue";
</script>
<template>
  <div class="container">
    <ClientOnly>
      <WalletMultiButton />
    </ClientOnly>
  </div>
</template>

<script>
export default {};
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
