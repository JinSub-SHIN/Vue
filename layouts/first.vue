<template lang="pug">
div 
  section.welcome-section
    Nuxt
</template>

<script>
export default {
  watch: {
    $route(to, from) {
      console.log("route change to", to);
      console.log("route change from", from);
    },
  },
};
</script>

<style lang="scss" scoped>
.welcome-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(to bottom right, #001f3f, #111111);
}
</style>
