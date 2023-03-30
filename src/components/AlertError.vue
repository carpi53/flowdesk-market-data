<script setup lang="ts">
const props = defineProps({
  message: String,
});
</script>

<template>
  <div class="container">
     Failed to fetch - error : {{ message }}
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 72px;
  background-color: var(--red);
  border-radius: 10px;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  color: white;
}
</style>
