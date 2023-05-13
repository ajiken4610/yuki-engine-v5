<template lang="pug">
div
  textarea.w-100(v-model="inputValue", rows="10")
  .whitespace-pre(v-text="outputValue")
</template>

<script setup lang="ts">
const inputValue = ref(
  "path: /abcdef/ab.ts; position: 0 0 0; rotation: 0 90 0"
);
const outputValue = computed(() =>
  JSON.stringify(parseCSSLike(inputValue.value), null, 2)
);
// console.log(parseCSSLike("hello:world"));
</script>

<style lang="scss" scoped>
.whitespace-pre {
  white-space: pre;
}
.w-100 {
  width: 100%;
}
</style>
