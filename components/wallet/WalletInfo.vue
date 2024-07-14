<template>
  <ul>
    <li v-for="token in tokens" :key="token.code">
      <div class="flex-between assetsCard">
        <div class="flex-start flex-1">
          <img :src="token.imgPath" :alt="token.name + 'logo'" />
        </div>
        <div class="flex-center flex-1 gap-10" style="flex-direction: column">
          <p style="margin: 0">{{ token.name }}</p>
          <p style="margin: 0">
            {{ token.code === "SOL" ? balance : 0 }} {{ token.code }}
          </p>
        </div>
        <div class="flex-end flex-1">
          <p>$ 150,1545</p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapActions, mapState } from "pinia";
import Solana from "../CoinLogo/Solana.vue";
import { tokens } from "~/assets/tokens.json";
export default {
  name: "WalletInfo",
  data() {
    return {
      tokens: tokens,
    };
  },
  components: {
    Solana,
  },
  computed: {
    ...mapState(useWalletStore, ["balance"]),
  },
  methods: {
    ...mapActions(useWalletStore, ["initializeAnchor"]),
    ...mapActions(useSwapStore, ["swapTransaction"]),
  },
  created() {
    this.initializeAnchor();
  },
};
</script>

<style scoped>
ul {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
li {
  width: 100%;
}
.assetsCard {
  background: linear-gradient(225deg, var(--primary-900), var(--surface-card));
  border-radius: 12px;
  padding: 6px 10px;
}
</style>
