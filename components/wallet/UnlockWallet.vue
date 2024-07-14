<template>
  <form
    @submit.prevent="checkPassword(password)"
    class="flex-col gap-48"
    style="align-items: center"
  >
    <h2 style="text-align: center">Welcome Back!</h2>
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
      <PrimeCheckbox
        v-model="savePassword"
        inputId="savePassword"
        :binary="true"
        style="margin-right: 10px"
      />
      <label for="savePassword" class="ml-2"> Keep me signed in </label>
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
      savePassword: false,
      showError: false,
    };
  },
  methods: {
    ...mapActions(useAccountStore, ["unlockWallet"]),
    checkPassword() {
      const error = this.unlockWallet(this.password);
      if (error) {
        this.showError = true;
      } else {
        if (savePassword) {
          localStorage.setItem("password", this.password);
        }
        this.$router.push("/wallet");
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
