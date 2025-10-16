<template>
  <div>
    <section class="hero">
      <h1>BRINGING THE UNSEEN ON SCREEN</h1>
      <p>Discover top-rated movies from around the world.</p>
    </section>

    <SectionFade>
      <h2>Popular Movies</h2>
      <div class="grid">
        <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>
    </SectionFade>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const { data: movies } = await useFetch(
  `https://api.themoviedb.org/3/movie/popular?api_key=${config.public.movieApiKey}`
);
</script>

<style scoped>
.hero {
  text-align: center;
  padding: 6rem 1rem;
  background: linear-gradient(180deg, #0b0c10, #1f2833);
}
h1 {
  font-size: 3rem;
  line-height: 1.2;
}
.grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  margin-top: 2rem;
}
</style>
