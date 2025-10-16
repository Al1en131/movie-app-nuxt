import { ref, onMounted, onUnmounted } from "vue";

export function useInView() {
  const isVisible = ref(false);
  const element = ref<HTMLElement | null>(null);

  let observer: IntersectionObserver;

  onMounted(() => {
    observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.value = entry.isIntersecting;
      },
      { threshold: 0.2 }
    );

    if (element.value) observer.observe(element.value);
  });

  onUnmounted(() => {
    if (element.value) observer.unobserve(element.value);
  });

  return { element, isVisible };
}
