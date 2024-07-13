<template>
  <div class="container">
    <PrimeCard class="card">
      <template #title>
        <div class="flex-between">
          <PrimeButton icon="pi pi-angle-left" size="large" text />
          <h1 style="font-size: 24px">My First Wallet</h1>
          <PrimeButton icon="pi pi-bars" size="large" text />
        </div>
      </template>
      <template #content>
        <WalletInfo />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum ullam
          facilis possimus ut velit placeat? At ea quibusdam iste impedit.
        </p>
      </template>
    </PrimeCard>
  </div>
</template>

<script>
import WalletInfo from "~/components/wallet/WalletInfo.vue";

export default {
  components: {
    WalletInfo,
  },
};
</script>

<style scoped></style>
