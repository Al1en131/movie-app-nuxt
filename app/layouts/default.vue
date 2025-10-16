<template>
  <div>
    <header
      class="p-4 flex justify-between items-center border-b border-gray-700"
    >
      <NuxtLink to="/">🎬 MovieApp</NuxtLink>
      <nav>
        <NuxtLink to="/" class="mr-4">Home</NuxtLink>
        <!-- <NuxtLink to="/about/1">About</NuxtLink> -->
      </nav>
    </header>

    <transition name="page" mode="out-in">
      <slot />
    </transition>
  </div>
</template>

<style scoped>
header a:hover {
  opacity: 0.7;
  transition: 0.3s;
}
</style>
