import { defineStore } from "pinia";
import {
  Keypair,
  Connection,
  PublicKey,
  Transaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { Program, AnchorProvider } from "@project-serum/anchor";

import { IDL } from "~/counter_idl";

export const useWalletStore = defineStore("walletStore", {
  state: () => ({
    connection: new Connection("https://api.devnet.solana.com", "confirmed"),
    wallet: null,
    program: null,
    balance: null,
  }),
  getters: {},
  actions: {
    async initializeAnchor() {
      const accountStore = useAccountStore();

      this.wallet = Keypair.fromSecretKey(
        new Uint8Array(accountStore.secretKey)
      );
      const provider = new AnchorProvider(this.connection, this.wallet, {});
      // Initialize the program
      const programId = new PublicKey(this.wallet.publicKey);
      this.program = new Program(IDL, programId, provider);
      await this.getBalance();
    },
    async getBalance() {
      const balance = await this.connection.getBalance(
        new PublicKey(this.wallet.publicKey)
      );
      this.balance = balance / LAMPORTS_PER_SOL;
    },
    async requestAirdrop() {
      try {
        const airdropSignature = await this.connection.requestAirdrop(
          this.wallet.publicKey,
          LAMPORTS_PER_SOL
        );
        const confirmTransaction = await this.connection.confirmTransaction(
          airdropSignature
        );
        await this.getBalance();
        return null;
      } catch (error) {
        return error;
      }
    },
    async sendTransaction(instruction) {
      const provider = new AnchorProvider(this.connection, this.wallet, {});
      const transaction = new Transaction().add(instruction);
      const signature = await provider.sendAndConfirm(transaction);
      return signature;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWalletStore, import.meta.hot));
}
