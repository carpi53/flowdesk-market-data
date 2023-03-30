<script setup lang="ts">
const props = defineProps({
  title: String,
});
</script>

<template>
  <div class="container">
    <h1>{{ title }}</h1>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 72px;
  background-color: var(--darkerBlue);
  border-radius: 10px;
  padding: 14px 16px;
  display: flex;
  align-items: center;

  h1 {
    color: white;
  }
}
</style>
