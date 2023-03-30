<script setup lang="ts"></script>

<template>
  <div class="loader">
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  </div>
</template>

<style lang="scss" scoped>
.loader {
  display: flex;
  justify-content: center;
}
.dot {
  width: 15px;
  height: 15px;
  margin: 0 3px;
  border-radius: 50%;
  background: var(--darkerBlue);
  animation: load 0.3s infinite ease-out alternate;
}

.dot:nth-child(2) {
  animation-delay: 0.1s;
}

.dot:nth-child(3) {
  animation-delay: 0.2s;
}

@keyframes load {
  to {
    transform: translateY(10px);
  }
}
</style>
