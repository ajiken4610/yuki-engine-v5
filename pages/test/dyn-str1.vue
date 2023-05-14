<template lang="pug">
div see console
</template>

<script setup lang="ts">
const result = await useDynamicStringReference("hello@/test/dynStr.js", {}, {});
console.log(result);
</script>
