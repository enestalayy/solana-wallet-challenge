import { defineStore } from "pinia";
import {
  Keypair,
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { Program, web3, AnchorProvider } from "@project-serum/anchor";
import { IDL } from "~/counter_idl";

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
    unlockAccount(password) {
      this.password = password;

      const kp = Keypair.generate();
      this.secretKey = kp.secretKey;
      this.publicKey = kp.publicKey.toBase58();
      console.log("kp.publicKey.toBase58 :>> ", kp.publicKey.toBase58());
      console.log("kp.secretKey :>> ", kp.secretKey);
      this.initializeAnchor();
    },
    async initializeAnchor() {
      const connection = new Connection(
        "https://api.devnet.solana.com",
        "confirmed"
      );

      const wallet = Keypair.fromSecretKey(new Uint8Array(this.secretKey));
      console.log("wallet :>> ", wallet);

      const provider = new AnchorProvider(connection, wallet, {});
      console.log("provider :>> ", provider);

      // Initialize the program
      const programId = new PublicKey(
        "CounNZdmsQmWh7uVngV9FXW2dZ6zAgbJyYsvBpqbykg"
      );
      this.program = new Program()(IDL, programId, provider);
      console.log("this.program :>> ", this.program);
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
