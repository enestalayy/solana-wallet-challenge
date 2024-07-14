<template>
  <div class="container">
    <PrimeToast />

    <PrimeCard class="card"">
      <template #title>
        <div class="flex-between">
          <PrimeButton
            @click="lockWallet"
            icon="pi pi-lock"
            size="large"
            text
          />
          <h1 style="font-size: 24px">My Wallet</h1>
          <PrimeButton icon="pi pi-bars" size="large" text />
        </div>
      </template>
      <template #content>
        
        <LazyWalletInfo v-if="secretKey" />
        <div v-else class="flex-center" style="width: 100%; height: 250px;"><PrimeProgressSpinner aria-label="Custom ProgressSpinner" /></div>
        <div>
          <ul>
            <li>
              <PrimeButton @click="reqAirdrop" size="small" label="Request Airdrop" icon="pi pi-plus" />
            </li>
            <li><PrimeButton size="small" label="Send" icon="pi pi-send" /></li>
            <li>
              <PrimeButton
                size="small"
                label="Swap"
                icon="pi pi-arrow-right-arrow-left"
              />
            </li>
          </ul>
        </div>
      </template>
    </PrimeCard>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import WalletInfo from "~/components/wallet/WalletInfo.vue";

export default {
  components: {
    WalletInfo,
  },

  computed: {
    ...mapState(useAccountStore, ["secretKey", "password"]),
  },
  mounted() {
    const savedPassword = localStorage.getItem("password");
    console.log("savedPassword :>> ", savedPassword);
    if (savedPassword) {
      this.unlockWallet(savedPassword);
    } else if(!this.password) {
      this.$router.push("/")
    }
  },
  methods: {
    ...mapActions(useAccountStore, ["unlockWallet"]),
    ...mapActions(useWalletStore, ["getBalance", "requestAirdrop"]),
    lockWallet() {
      localStorage.removeItem("password");
      this.$router.push("/");
    },
    async reqAirdrop() {
      const error = await this.requestAirdrop()
      if (error) {
        console.log('error :>> ', error);
        this.$toast.add({
          severity: "info",
          summary: "Airdrop request failed",
          detail: "You have requested too many airdrops.",
          life: 3000,
        });
      } else {
        this.$toast.add({
          severity: "success",
          summary: "Airdrop request has been send",
          detail: "This may take a few minutes.",
          life: 3000,
        });
      }
      
    }
  },
};
</script>

<style scoped>
ul {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
