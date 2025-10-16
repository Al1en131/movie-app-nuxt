<template>
  <div class="movie-card">
    <NuxtLink :to="`/about/${movie.id}`">
      <img
        :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
        :alt="movie.title"
      />
      <h3>{{ movie.title }}</h3>
    </NuxtLink>
  </div>
</template>

<script setup>
defineProps({ movie: Object });
</script>

<style scoped>
.movie-card {
  text-align: center;
  transition: transform 0.3s ease;
}
.movie-card:hover {
  transform: scale(1.05);
}
.movie-card img {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);
}
h3 {
  margin-top: 0.5rem;
  font-weight: 600;
}
</style>
