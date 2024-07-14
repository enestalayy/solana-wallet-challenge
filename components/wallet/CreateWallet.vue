<template>
  <form
    v-if="!program"
    @submit.prevent="createWallet"
    class="CreateWalletContainer"
  >
    <div class="flex-col gap-24" style="padding-top: 6px">
      <PrimeFloatLabel>
        <PrimePassword
          v-model="password"
          inputId="password"
          toggleMask
          :feedback="false"
        />
        <label for="password">Enter a Password</label>
      </PrimeFloatLabel>
      <PrimeFloatLabel>
        <PrimePassword
          v-model="confirmPassword"
          inputId="confirmPassword"
          :feedback="false"
          style="width: 100%"
        />
        <label for="confirmPassword">Confirm your Password</label>
      </PrimeFloatLabel>
    </div>
    <ul style="list-style: none">
      <li>
        <i
          :class="'pi ' + (password.match(/[a-z]/) ? 'pi-check' : 'pi-times')"
        />
        At least one lowercase
      </li>
      <li>
        <i
          :class="'pi ' + (password.match(/[A-Z]/) ? 'pi-check' : 'pi-times')"
        />
        At least one uppercase
      </li>
      <li>
        <i
          :class="'pi ' + (password.match(/[0-9]/) ? 'pi-check' : 'pi-times')"
        />
        At least one numeric
      </li>
      <li>
        <i :class="'pi ' + (password.length >= 8 ? 'pi-check' : 'pi-times')" />
        Minimum 8 characters
      </li>
      <li :style="showConfirmError && 'color: var(--red-500)'">
        <i
          :class="
            'pi ' +
            (password && password === confirmPassword ? 'pi-check' : 'pi-times')
          "
        />
        Confirm your password
      </li>
    </ul>
    <PrimeButton
      type="submit"
      :disabled="!passwordRegex.test(password) || confirmPassword.length < 1"
      label="Create Wallet"
    />
  </form>
  <RegisterRule v-else />
</template>

<script>
import { mapActions, mapState } from "pinia";
import RegisterRule from "./RegisterRule.vue";

export default {
  name: "CreateWallet",
  components: {
    RegisterRule,
  },
  data() {
    return {
      password: "",
      confirmPassword: "",
      showConfirmError: false,
      passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
    };
  },
  computed: {
    ...mapState(useWalletStore, ["program"]),
  },
  methods: {
    ...mapActions(useAccountStore, ["initWallet"]),
    createWallet() {
      this.password === this.confirmPassword
        ? this.initWallet(this.password)
        : (this.showConfirmError = true);
    },
  },
};
</script>

<style scoped>
.CreateWalletContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

ul {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding-left: 0;
}
li {
  font-size: 1rem;
}
.pi-check {
  color: var(--primary-color);
}
.pi-times {
  color: var(--red-500);
}
</style>
