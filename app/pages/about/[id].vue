<template>
  <div v-if="movie" class="movie-detail">
    <div
      class="hero"
      :style="{
        backgroundImage: `linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.6) 100%,
        rgba(115, 45, 61, 0.7) 100%
        ), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }"
    >
      <div class="overlay">
        <div class="hero-content">
          <h1>{{ movie.title }}</h1>
          <div class="meta">
            <span class="meta-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
                />
              </svg>
              {{ movie.release_date?.slice(0, 4) }}
            </span>

            <span class="meta-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              {{ movie.runtime }} min
            </span>

            <span class="meta-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
              {{ movie.vote_average.toFixed(1) }}
            </span>
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
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  opacity: 0.75;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.icon {
  width: 16px;
  height: 16px;
  opacity: 0.8;
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

  .hero-content {
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
  border : 0;
  background: rgb(115, 45, 61);
  color: #e7d39d;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s ease;
}

.back-btn:hover {
  background: #e7d39d;
  color: rgb(115, 45, 61);
}

svg {
  width: 20px;
  height: 20px;
}

section {
  padding: 0;
}

.similar h2 {
  font-size: 1.5em;
  color: #e7d39d;
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
  color: rgba(115, 45, 61, 0.9);
}
</style>
