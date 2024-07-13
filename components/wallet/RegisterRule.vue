<template>
  <div class="flex-col-between gap-24" style="max-width: 320px">
    <h3>Secret Recovery Phrase</h3>
    <p style="text-align: center">
      This phrase is the ONLY way to recover your wallet. Do NOT share it with
      anyone!
    </p>
    <NuxtLink to="wallet">
      <PrimeButton icon="pi pi-unlock" label="Unlock your wallet" />
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: "RegisterRule",
};
</script>

<style lang="scss" scoped></style>
