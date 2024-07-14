import { defineStore } from "pinia";
import { Connection, Keypair, VersionedTransaction } from "@solana/web3.js";
import fetch from "cross-fetch";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";

class Wallet extends NodeWallet {
  constructor(keypair) {
    super(keypair);
  }
}

export const useSwapStore = defineStore("swapStore", {
  state: () => ({
    connection: new Connection("https://api.devnet.solana.com", "confirmed"),
    USDC: "EPjFWdd5AufqSSqeM2qZhg4c9W3FJJia3qcF1kNJY2VF",
    SOL: "So11111111111111111111111111111111111111112",
    USDT: "Es9vMFrzaCERPSuMpZTU8wT1dRrEKf8o4A5rUBzWGiTg",
    SRM: "ErGBqhvqZbdJaqKw8K6qgRYz2QH3CUK2u2ByfD6KqzMc",
  }),
  getters: {},
  actions: {
    async swapTransaction() {
      const connection = new Connection(
        "https://neat-hidden-sanctuary.solana-mainnet.discover.quiknode.pro/2af5315d336f9ae920028bbb90a73b724dc1bbed/"
      );

      const accountStore = useAccountStore();
      // SETUP WALLET
      const wallet = new Wallet(
        Keypair.fromSecretKey(accountStore.secretKey || "")
      );
      console.log("wallet :>> ", wallet);

      // Swapping SOL to USDC with input 0.1 SOL and 0.5% slippage
      const quoteResponse = await (
        await $fetch(
          "https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=EPjFWdd5AufqSSqeM2qZhg4c9W3FJJia3qcF1kNJY2VF&amount=1"
        )
      ).json();
      console.log({ quoteResponse });

      // get serialized transactions for the swap
      const { swapTransaction } = await (
        await fetch("https://quote-api.jup.ag/v6/swap", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // quoteResponse from /quote api
            quoteResponse,
            // user public key to be used for the swap
            userPublicKey: wallet.publicKey.toString(),
            // auto wrap and unwrap SOL. default is true
            wrapAndUnwrapSol: true,
            // feeAccount is optional. Use if you want to charge a fee.  feeBps must have been passed in /quote API.
            // feeAccount: "fee_account_public_key"
          }),
        })
      ).json();

      // deserialize the transaction
      const swapTransactionBuf = Buffer.from(swapTransaction, "base64");
      var transaction = VersionedTransaction.deserialize(swapTransactionBuf);
      console.log(transaction);

      // sign the transaction
      transaction.sign([wallet.payer]);

      // Execute the transaction
      const rawTransaction = transaction.serialize();
      const txid = await connection.sendRawTransaction(rawTransaction, {
        skipPreflight: true,
        maxRetries: 2,
      });
      await connection.confirmTransaction(txid);
      console.log(`https://solscan.io/tx/${txid}`);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSwapStore, import.meta.hot));
}
