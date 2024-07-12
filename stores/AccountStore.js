import { defineStore } from "pinia";
import {
  Keypair,
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

export const useAccountStore = defineStore("accountStore", {
  state: () => ({
    password: "",
    secretKey: null,
    publicKey: null,
    balance: null,
  }),
  getters: {},
  actions: {
    unlockAccount(password) {
      this.password = password;

      const kp = Keypair.generate();
      this.secretKey = kp.secretKey;
      this.publicKey = kp.publicKey.toBase58();
      console.log("kp.publicKey.toBase58 :>> ", kp.publicKey.toBase58());
      console.log("kp.secretKey :>> ", kp.secretKey);
    },
    async getBalance() {
      const connection = new Connection(
        "https://api.devnet.solana.com",
        "confirmed"
      );
      const balance = await connection.getBalance(
        new PublicKey(this.publicKey)
      );
      this.balance = balance / LAMPORTS_PER_SOL;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAccountStore, import.meta.hot));
}
