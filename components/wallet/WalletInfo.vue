<template>
  <div>
    <h5 v-if="password" style="margin: 0">Balance: {{ balance }} $</h5>

    <ul>
      <li><PrimeButton size="small" label="Receive" icon="pi pi-plus" /></li>
      <li><PrimeButton size="small" label="Send" icon="pi pi-send" /></li>
      <li>
        <PrimeButton
          size="small"
          label="Swap"
          icon="pi pi-arrow-right-arrow-left"
        />
      </li>
    </ul>

    <h4>Info 3</h4>
    <PrimeButton @click="connectToPartnerApp" label="ZORT" />
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";

export default {
  name: "WalletInfo",
  computed: {
    ...mapState(useAccountStore, ["password", "balance"]),
  },
  methods: {
    ...mapActions(useAccountStore, ["getBalance", "connectToPartnerApp"]),
  },
  created() {
    this.getBalance();
  },
};
</script>

<style scoped>
div {
  width: 100%;
}
ul {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
