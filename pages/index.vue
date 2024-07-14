<template>
  <div class="container">
    <PrimeCard class="card">
      <template #title>
        <div class="flex-center" style="width: 100%">
          <PrimeButton
            @click="backToMenu"
            v-show="showCreateWallet || showImportWallet"
            class="backButton"
            icon="pi pi-angle-left"
            size="large"
            text
          />
          <img
            v-if="!showCreateWallet"
            class="walletImg"
            src="/wallet_100px.webp"
            alt="Secured Coin Wallet"
          />
          <h1 v-else style="font-size: 24px; margin: 0">
            {{ program ? "Unlock your Wallet" : "Create Wallet" }}
          </h1>
        </div>
      </template>
      <template #content>
        <UnlockWallet v-if="secretKey" />
        <div v-else>
          <div
            v-show="!showCreateWallet"
            class="flex-col gap-20"
            style="align-items: center"
          >
            <PrimeButton
              @click="showCreateWallet = true"
              label="Create a new wallet"
            />
            <PrimeButton
              @click="showImportWallet = true"
              label="Import an existing wallet"
              text
            />
          </div>
          <CreateWallet v-if="showCreateWallet" />
        </div>
      </template>
    </PrimeCard>
  </div>
</template>

<script>
import { mapState } from "pinia";
import CreateWallet from "~/components/wallet/CreateWallet.vue";
import UnlockWallet from "~/components/wallet/UnlockWallet.vue";

export default {
  components: {
    CreateWallet,
    UnlockWallet,
  },
  data() {
    return {
      showCreateWallet: false,
      showImportWallet: false,
      secretKey: localStorage.getItem("secretKey"),
    };
  },

  computed: {
    ...mapState(useWalletStore, ["program"]),
  },

  methods: {
    backToMenu() {
      this.showCreateWallet = false;
      this.showImportWallet = false;
    },
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
