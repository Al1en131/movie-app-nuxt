<template>
  <div class="detail">
    <button @click="$router.back()" class="back-btn">← Back</button>

    <div v-if="movie">
      <img
        :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
        :alt="movie.title"
      />
      <div>
        <h1>{{ movie.title }}</h1>
        <p>{{ movie.overview }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const config = useRuntimeConfig();
const { data: movie } = await useFetch(
  `https://api.themoviedb.org/3/movie/${route.params.id}?api_key=${config.public.movieApiKey}`
);
</script>

<style scoped>
.detail {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.detail img {
  max-width: 300px;
  border-radius: 12px;
}
.back-btn {
  align-self: flex-start;
  background: none;
  color: #66fcf1;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  margin-bottom: 1rem;
}
</style>
