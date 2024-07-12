<template>
  <form @submit.prevent="unlockAccount(password)" class="emptyWalletContainer">
    <PrimeFloatLabel>
      <PrimePassword
        v-model="password"
        inputId="password"
        toggleMask
        :feedback="false"
      />
      <label for="password">Enter a Password</label>
    </PrimeFloatLabel>
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
    </ul>
    <PrimeButton
      type="submit"
      :disabled="!passwordRegex.test(password)"
      label="Unlock"
    />
  </form>
  <WalletAdapter />
</template>

<script>
import { mapActions } from "pinia";
import WalletAdapter from "./WalletAdapter.vue";

export default {
  name: "EmptyWallet",
  components: {
    WalletAdapter,
  },
  data() {
    return {
      password: "",
      passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
    };
  },
  methods: {
    ...mapActions(useAccountStore, ["unlockAccount"]),
  },
};
</script>

<style scoped>
.emptyWalletContainer {
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
  gap: 10px;
  padding-left: 0;
}
li {
  font-size: 16px;
}
.pi-check {
  color: var(--primary-color);
}
.pi-times {
  color: var(--red-500);
}
</style>
