<template>
  <div v-if="movie" class="movie-detail">
    <div
      class="hero"
      :style="{
        backgroundImage: `linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.7),
          rgba(0, 0, 0, 1)
        ), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }"
    >
      <div class="overlay">
        <div class="hero-content">
          <h1>{{ movie.title }}</h1>
          <div class="meta">
            <span>{{ movie.release_date?.slice(0, 4) }}</span>
            <span> • {{ movie.runtime }} min</span>
            <span> • ⭐ {{ movie.vote_average.toFixed(1) }}</span>
          </div>
          <p>{{ movie.overview }}</p>
          <div class="buttons">
            <button class="back-btn" @click="$router.back()">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                />
              </svg>
              Back
            </button>
          </div>
        </div>

        <section v-if="similarMovies?.results?.length" class="similar">
          <h2>Similar Movies</h2>
          <div class="carousel" ref="carousel">
            <ClientOnly>
              <MovieCard
                v-for="(m, index) in similarMovies.results"
                :key="m.id"
                :movie="m"
                class="movie-card"
                ref="cards"
                :style="{ transitionDelay: `${index * 0.1}s` }"
              />
            </ClientOnly>
          </div>
        </section>
      </div>
    </div>
  </div>

  <div v-else class="loading">
    <p>Loading movie details...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const carousel = ref(null);
const cards = ref([]);

const headers = {
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YmRhMDQ0MGZmYmI2NmNlMzRiZjMyMWJkYzdhYWViMSIsIm5iZiI6MTc2MDY1MTMxMC43MTcsInN1YiI6IjY4ZjE2ODJlNjQ2MDNiMWQxNGUyYmRkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.on6Ucx3IVRby1IPJtb1gWOgQCw0CD9wdd9iw5nS0LHU",
  accept: "application/json",
};

const { data: movie } = await useFetch(
  `https://api.themoviedb.org/3/movie/${route.params.id}?language=en-US`,
  { headers }
);

const { data: similarMovies } = await useFetch(
  `https://api.themoviedb.org/3/movie/${route.params.id}/similar?language=en-US&page=1`,
  { headers }
);

onMounted(async () => {
  await nextTick();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  const cardEls = document.querySelectorAll(".movie-card");
  cardEls.forEach((el) => observer.observe(el));
});
</script>
<style scoped>
.hero {
  position: relative;
  height: 100vh; 
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  padding: 2rem;
}
.hero-content {
  padding-top: 8rem;
  max-width: 600px;
  z-index: 2;
}
.hero h1 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-top: 5rem;
  margin-bottom: 0.5rem;
}
.meta {
  font-size: 0.8rem;
  opacity: 0.7;
}
.hero p {
  font-size: 0.8rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
}
.movie-detail {
  color: #fff;
  background-color: #0b0c10;
  min-height: 0vh;
  font-family: "Poppins", sans-serif;
  overflow: hidden;
}

@media (max-width: 1024px) {
  .hero-content {
    padding-top: 6rem;
    max-width: 500px;
  }

  .hero h1 {
    font-size: 1.6rem;
  }

  .hero p {
    font-size: 0.85rem;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 3rem 1.5rem;
  }

  .hero h1 {
    font-size: 1.4rem;
  }

  .hero p {
    font-size: 0.8rem;
  }

  .movie-card {
    width: 130px;
    height: 180px;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 2rem 2rem;
  }

  .hero-content{
    max-width: 300px;
  }

  .hero h1 {
    font-size: 1.2rem;
  }

  .hero p {
    font-size: 0.75rem;
  }

  .movie-card {
    width: 120px;
    height: 160px;
  }

  .similar h2 {
    font-size: 1.1rem;
  }
}


.buttons {
  margin-top: 1.2rem;
}
.back-btn {
  display: flex;
  align-items: center; 
  gap: 0.5rem; 
  border: 1px solid rgba(115, 45, 61, 0.9);
  background: transparent;
  color: rgba(115, 45, 61, 0.9);
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s ease;
}

.back-btn:hover {
  background: rgba(115, 45, 61, 0.9);
  color: white;
}

.back-btn svg {
  width: 20px;
  height: 20px;
}

section{
  padding: 0;
}

.similar h2 {
  font-size: 1.4em;
  color: rgba(115, 45, 61, 0.9);
  margin-bottom: 1rem;
}

.carousel {
  display: flex;
  gap: 1.2rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;
}
.carousel::-webkit-scrollbar {
  display: none;
}
.movie-card {
  flex: 0 0 auto;
  width: 150px;
  height: 195px; 
  cursor: pointer;
  transition: transform 0.3s ease, opacity 0.6s ease;
  opacity: 0;
  transform: translateY(40px);
  scroll-snap-align: start;
  overflow: hidden; 
  border-radius: 10px;
  background: #1f2833; 
}

.movie-card img {
  width: 100%;
  height: 100%;
  object-fit: cover; 
  border-radius: 10px;
}

.movie-card:hover {
  transform: scale(1.08);
}
.movie-card h3 {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.85);
}

.fade-in-visible {
  opacity: 1;
  transform: translateY(0);
}

.loading {
  text-align: center;
  padding: 4rem;
  color:  rgba(115, 45, 61, 0.9);
}
</style>
