<template>
  <div>
    <div class="hero">
      <div class="hero-content">
        <h5>Stream. Discover. Enjoy.</h5>
        <h1>Your Gateway to Unlimited Entertainment</h1>
        <p>
          Explore a world where every story comes to life — from blockbuster
          movies to hidden gems and trending shows. Discover your next favorite
          title and dive into unforgettable moments, all in one seamless
          experience.
        </p>
      </div>
    </div>

    <SectionFade>
      <div class="fade-group">
        <div class="item">
          <h2>Popular Movies</h2>
          <div class="grid">
            <ClientOnly>
              <MovieCard
                v-for="movie in movies"
                :key="movie.id"
                :movie="movie"
              />
            </ClientOnly>
          </div>
        </div>
      </div>
    </SectionFade>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import Lenis from "@studio-freight/lenis";

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

onMounted(() => {
  gsap.from(".hero h5", {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.2,
    ease: "power3.out",
  });

  gsap.from(".hero h1", {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.6,
    ease: "power3.out",
  });

  gsap.from(".hero p", {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 1.0,
    ease: "power3.out",
  });
});

onMounted(() => {
  const lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
});
</script>

<style scoped>
.hero {
  position: relative;
  text-align: center;
  padding: 15rem 1rem;
  color: #fff;
  background: linear-gradient(
      180deg,
      rgba(11, 12, 16, 0.9),
      rgba(31, 40, 51, 0.9)
    ),
    url("/assets/image/hero-bg.jpg") center/cover no-repeat;
  background-attachment: fixed;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 900px;
  margin: 0 auto;
}

.hero-content p {
  max-width: 650px;
  margin: 1rem auto 0;
  line-height: 1.7;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.85);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

h5 {
  margin: 0 0 0.5rem 0;
  font-size: 1.6rem;
}

h1 {
  font-size: 4rem;
  line-height: 1.2;
  margin: 0;
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

.fade-group .item {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.visible .item {
  opacity: 1;
  transform: translateY(0);
}
.visible .item:nth-child(2) {
  transition-delay: 0.2s;
}
.visible .item:nth-child(3) {
  transition-delay: 0.4s;
}
</style>
