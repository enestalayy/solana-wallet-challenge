<template>
  <div class="flex-col-between gap-24">
    <img class="walletImg" src="/wallet_100px.webp" alt="Secured Coin Wallet" />
    <h3>Secret Recovery Phrase</h3>
    <p style="text-align: center">
      This phrase is the ONLY way to recover your wallet. Do NOT share it with
      anyone!
    </p>
    <NuxtLink to="wallet">
      <PrimeButton
        @click="unlockWallet(password)"
        icon="pi pi-unlock"
        label="Unlock your wallet"
      />
    </NuxtLink>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";

export default {
  name: "RegisterRule",
  computed: {
    ...mapState(useAccountStore, ["password"]),
  },
  methods: {
    ...mapActions(useAccountStore, ["unlockWallet"]),
  },
};
</script>

<style scoped>
.walletImg {
  width: 120px;
  height: 120px;
  border-radius: 12px;
}
</style>
