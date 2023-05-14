<template lang="pug">
div see console
</template>

<script setup lang="ts">
const result = await useDynamicStringReference(
  "hello@/test/dynStr.json",
  {},
  { lang: "ja", region: "jp" }
);
console.log(result);
</script>
