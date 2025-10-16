<template>
  <section ref="element" :class="{ visible: isVisible }">
    <slot />
  </section>
</template>

<script setup>
import { useInView } from "~/composables/useInView";
const { element, isVisible } = useInView();
</script>

<style scoped>
section {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
section.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
