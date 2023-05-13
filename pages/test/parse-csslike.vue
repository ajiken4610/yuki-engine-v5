<template lang="pug">
div
  textarea.h-40.m-2.mx-auto.border-2.block(class="w-4/5", v-model="inputValue")
  .whitespace-pre.m-2(v-text="outputValue")
</template>

<script setup lang="ts">
const inputValue = ref(
  "path: /abcdef/ab.ts; position: 0 0 0; rotation: 0 90 0 XYZ,\npath: /abcdef/cd.ts; position: 0 0 0; rotation: 0 90 0 XYZ"
);
const outputValue = computed(() =>
  JSON.stringify(parseCSSLike(inputValue.value), null, 2)
);
// console.log(parseCSSLike("hello:world"));
</script>
