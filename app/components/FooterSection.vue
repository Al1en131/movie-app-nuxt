<template>
  <footer class="footer">
    <p>© {{ new Date().getFullYear() }} Screenify. All rights reserved.</p>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer {
  text-align: center;
  padding: 0.5rem 0.5rem;
  background-color: #0b0c10;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
