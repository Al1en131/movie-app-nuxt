<template>
  <div>
    <header class="header">
      <NuxtLink to="/" class="logo">Screenify</NuxtLink>
    </header>

    <transition name="page" mode="out-in">
      <slot />
    </transition>
  </div>
</template>

<style scoped>
.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: transparent; 
  z-index: 5; 
}

.logo {
  text-decoration: none;
  color: #66fcf1;
  font-size: 1.5rem;
  font-weight: bold;
  transition: opacity 0.3s ease;
}

.logo:hover {
  opacity: 0.7;
}
</style>
