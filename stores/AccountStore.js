import { defineStore } from "pinia";
import {
  Keypair,
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { Program, web3, AnchorProvider } from "@project-serum/anchor";
import { IDL } from "~/counter_idl";
import CryptoJS from "crypto-js";

export const useAccountStore = defineStore("accountStore", {
  state: () => ({
    password: null,
    secretKey: null,
    publicKey: null,
  }),
  getters: {},
  actions: {
    initWallet(password) {
      this.password = password;

      const kp = Keypair.generate();
      this.secretKey = kp.secretKey;
      this.publicKey = kp.publicKey.toBase58();

      const STORAGE_KEY = "secretKey";

      const encrypted = CryptoJS.AES.encrypt(
        this.secretKey.toString(),
        password
      ).toString();
      localStorage.setItem(STORAGE_KEY, encrypted);
      const walletStore = useWalletStore();
      walletStore.initializeAnchor();
    },

    unlockWallet(enteredPassword) {
      const STORAGE_KEY = "secretKey";
      const encrypted = localStorage.getItem(STORAGE_KEY);
      if (!encrypted) return null;
      try {
        // SecretKey'i çözme
        var bytes = CryptoJS.AES.decrypt(encrypted, enteredPassword);
        var decryptedSecretKey = bytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedSecretKey) {
          throw new Error("Decryption failed");
        }

        this.secretKey = new Uint8Array(
          decryptedSecretKey.split(",").map(Number)
        );
        console.log("this.secretKey :>> ", this.secretKey);
        this.password = enteredPassword;
      } catch (error) {
        return error;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAccountStore, import.meta.hot));
}
