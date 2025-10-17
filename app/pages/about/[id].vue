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

    <div v-else>
      <p>Loading movie details...</p>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

const { data: movie } = await useFetch(
  `https://api.themoviedb.org/3/movie/${route.params.id}?language=en-US`,
  {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YmRhMDQ0MGZmYmI2NmNlMzRiZjMyMWJkYzdhYWViMSIsIm5iZiI6MTc2MDY1MTMxMC43MTcsInN1YiI6IjY4ZjE2ODJlNjQ2MDNiMWQxNGUyYmRkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.on6Ucx3IVRby1IPJtb1gWOgQCw0CD9wdd9iw5nS0LHU",
      accept: "application/json",
    },
  }
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
