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
    password: "",
    secretKey: null,
    publicKey: null,
    balance: null,
    program: null,
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
      console.log("kp.publicKey.toBase58 :>> ", kp.publicKey.toBase58());
      console.log("kp.secretKey :>> ", kp.secretKey);
      this.initializeAnchor();
    },

    unlockWallet(enteredPassword) {
      const STORAGE_KEY = "secretKey";

      const encrypted = localStorage.getItem(STORAGE_KEY);
      console.log("encrypted :>> ", encrypted);
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
        this.password = enteredPassword;
        console.log("this.secretKey :>> ", this.secretKey);
        console.log("this.password :>> ", this.password);
      } catch (error) {
        return error;
      }
    },

    async initializeAnchor() {
      const connection = new Connection(
        "https://api.devnet.solana.com",
        "confirmed"
      );

      const wallet = Keypair.fromSecretKey(new Uint8Array(this.secretKey));

      const provider = new AnchorProvider(connection, wallet, {});

      // Initialize the program
      const programId = new PublicKey(this.publicKey);
      this.program = new Program(IDL, programId, provider);
    },

    async connectToPartnerApp() {
      if (!this.program) {
        await this.initializeAnchor();
      }

      // Partner uygulamasına özel işlemler burada yapılacak
      // Örnek bir işlem
      const transaction = await this.program.rpc.increment({
        accounts: {
          counter: new PublicKey(this.publicKey),
          payer: new PublicKey(this.publicKey),
          systemProgram: web3.SystemProgram.programId,
        },
      });

      console.log("Transaction:", transaction);
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
