<template>
  <form @submit.prevent="checkPassword(password)" class="flex-col gap-48">
    <PrimeFloatLabel>
      <PrimePassword
        v-model="password"
        inputId="password"
        toggleMask
        :feedback="false"
        @input="showError = false"
      />
      <label for="password">Enter your password</label>
    </PrimeFloatLabel>
    <div class="flex-center" style="position: relative">
      <PrimeMessage
        v-if="showError"
        style="position: absolute; width: 100%"
        severity="error"
        :closable="false"
        >Incorrect password. Please try again.</PrimeMessage
      >
    </div>
    <PrimeButton
      type="submit"
      :disabled="this.password.length < 1"
      icon="pi pi-unlock"
      label="Unlock Wallet"
    />
  </form>
</template>

<script>
import { mapActions } from "pinia";

export default {
  name: "UnlockWallet",
  data() {
    return {
      password: "",
      showError: false,
    };
  },
  methods: {
    ...mapActions(useAccountStore, ["unlockWallet"]),
    checkPassword() {
      const error = this.unlockWallet(this.password);
      console.log("error :>> ", error);
      if (error) {
        this.showError = true;
        console.log("this.$refs :>> ", this.$refs);
      } else {
        this.$router.push("/wallet");
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
