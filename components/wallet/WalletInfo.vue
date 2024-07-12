<template>
  <div>
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
    <h4>Info 2</h4>
    <h4>Info 3</h4>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";

export default {
  name: "WalletInfo",
  computed: {
    ...mapState(useAccountStore, [""]),
  },
  methods: {
    ...mapActions(useAccountStore, ["getBalance"]),
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
  gap: 12px;
}
</style>
