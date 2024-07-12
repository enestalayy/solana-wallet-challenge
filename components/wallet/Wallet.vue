<template>
  <PrimeCard class="walletCard">
    <template #title>
      <div class="walletHeader">
        <PrimeButton v-if="password" icon="pi pi-bars" text />
        <img
          v-else
          class="walletImg"
          src="/wallet_100px.webp"
          alt="Secured Coin Wallet"
        />
        <div class="walletHeaderContent">
          <span style="display: flex"
            ><h1 style="margin: 0">{{ accountName }}</h1>
            <PrimeButton icon="pi pi-copy" text
          /></span>
          <h5 v-if="password" style="margin: 0">Balance: {{ balance }} $</h5>
        </div>
      </div>
    </template>
    <template #content>
      <div
        class="walletWrapper"
        :style="password && 'align-items: flex-start;'"
      >
        <EmptyWallet v-if="!password" />
        <WalletInfo v-else />
      </div>
    </template>
  </PrimeCard>
</template>

<script>
import { mapState } from "pinia";
import EmptyWallet from "./EmptyWallet.vue";
import WalletInfo from "./WalletInfo.vue";

export default {
  name: "Wallet",
  components: {
    EmptyWallet,
    WalletInfo,
  },
  computed: {
    ...mapState(useAccountStore, ["password", "balance"]),
    accountName() {
      if (this.password) {
        return "My Wallet";
      } else return "Wallet";
    },
  },
};
</script>

<style scoped>
.walletImg {
  width: 80px;
  height: 80px;
  border-radius: 12px;
}

.walletCard {
  min-width: 350px;
  width: fit-content;
  height: fit-content;
  text-align: center;
}
.walletWrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: fit-content;
  gap: 12px;
  padding: 12px;
}
.walletHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.walletHeaderContent {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
</style>
