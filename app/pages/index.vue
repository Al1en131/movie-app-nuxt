<template>
  <div>
    <section class="hero">
      <h1>BRINGING THE UNSEEN ON SCREEN</h1>
      <p>Discover top-rated movies from around the world.</p>
    </section>

    <SectionFade>
      <h2>Popular Movies</h2>
      <div class="grid">
        <ClientOnly>
          <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
        </ClientOnly>
      </div>
    </SectionFade>
  </div>
</template>

<script setup>
import MovieCard from "~/components/MovieCard.vue";
import { ref, onMounted } from "vue";

const movies = ref([]);

onMounted(async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YmRhMDQ0MGZmYmI2NmNlMzRiZjMyMWJkYzdhYWViMSIsIm5iZiI6MTc2MDY1MTMxMC43MTcsInN1YiI6IjY4ZjE2ODJlNjQ2MDNiMWQxNGUyYmRkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.on6Ucx3IVRby1IPJtb1gWOgQCw0CD9wdd9iw5nS0LHU",
        accept: "application/json",
      },
    }
  );
  const data = await res.json();

  movies.value = data.results.slice(0, 10);
});
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
  grid-template-columns: repeat(2, 1fr);
  margin-top: 2rem;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(5, 1fr); 
  }
}
</style>
