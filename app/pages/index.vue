<template>
  <div>
    <div class="hero">
      <div class="hero-content">
        <h5>Discover the Best of Cinema</h5>
        <h1>Top 10 Popular Movies</h1>
        <p>
          Explore the 10 most popular movies right now, complete with essential
          details like overview, cast, and ratings. Click on any movie to see
          more information and discover similar titles you might enjoy.
        </p>
      </div>
    </div>

    <section class="about">
      <div class="about-wrapper">
        <div class="about-image">
          <img src="/assets/image/about.jpg" alt="About image" />
        </div>
        <div class="about-text">
          <small>( ABOUT )</small>
          <h2>EXPLORE, DISCOVER,<br />AND ENJOY CINEMA</h2>
          <p>
            This website provides information about the top 10 most popular
            movies, allowing users to explore each film in more detail including
            its synopsis, cast, and ratings.
          </p>
          <p>
            When you select a movie, the site also shows a list of similar
            titles, helping you discover more films that match your interests.
            The goal is to offer an engaging and easy way to explore and learn
            more about trending movies.
          </p>
        </div>
      </div>
    </section>

    <SectionFade>
      <div class="fade-group">
        <div class="item">
          <div class="scrolling-text">
            <h2>
              POPULAR MOVIES — POPULAR MOVIES — POPULAR MOVIES — POPULAR MOVIES
              — POPULAR MOVIES — POPULAR MOVIES
            </h2>
          </div>

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
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

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
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".about-wrapper", {
    scrollTrigger: {
      trigger: ".about",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 80,
    duration: 1.2,
    ease: "power3.out",
  });

  gsap.from(".about-image", {
    scrollTrigger: {
      trigger: ".about",
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    x: -100,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
  });

  gsap.from(".about-text", {
    scrollTrigger: {
      trigger: ".about",
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    x: 100,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    delay: 0.2,
  });

  gsap.from(".about-text p, .about-text small, .about-text h2", {
    scrollTrigger: {
      trigger: ".about-text",
      start: "top 85%",
    },
    opacity: 0,
    y: 40,
    duration: 0.8,
    stagger: 0.2,
    delay: 0.3,
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
  color: #e0d4d4;
  background: linear-gradient(
      180deg,
      rgba(11, 12, 16, 0.9),
      rgba(115, 45, 61, 0.8)
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
  z-index: 5;
  color: #e0d4d4;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

h5 {
  margin: 0 0 0.5rem 0;
  font-size: 1.6rem;
  z-index: 5;
}

h1 {
  font-size: 4rem;
  line-height: 1.2;
  margin: 0;
  z-index: 5;
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

.about {
  background-color: rgba(115, 45, 61, 0.5);
  color: #cdd4ff;
  padding: 6rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.about-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  max-width: 1100px;
  width: 100%;
}

.about-image img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

.about-text small {
  font-size: 0.9rem;
  letter-spacing: 2px;
  color: #e7d39d;
}

.about-text h2 {
  font-size: 2.8rem;
  font-weight: 700;
  line-height: 1.3;
  margin: 1rem 0;
  color: #e7d39d;
}

.about-text p {
  font-size: 1.05rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.85);
  max-width: 420px;
}

@media (max-width: 900px) {
  .about-wrapper {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .about-text p {
    margin: 0 auto;
  }
}

.item h2 {
  color: rgba(115, 45, 61, 0.9);
}

.scrolling-text {
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  width: 100%;
  border-top: 2px solid rgba(255, 255, 255, 0.2);
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 0;
  margin-bottom: 2rem;
}

.scrolling-text h2 {
  display: inline-block;
  font-size: 4rem;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #e7d39d;
  animation: scrollText 20s linear infinite;
}

@keyframes scrollText {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@media (max-width: 768px) {
  .scrolling-text h2 {
    font-size: 2rem;
  }
}
</style>
