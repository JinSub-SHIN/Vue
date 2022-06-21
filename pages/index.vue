<template lang="pug">
div 
  section.welcome-section
    h1.welcome-main Hello, I'm Watt
    p.welcome-desc Enjoy more with a tap
</template>

<script>
export default {
  layout: 'contentMax' ,
  name: "IndexPage",
};
</script>

<style lang="scss">

.welcome-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(to bottom right, #001f3f, #111111);
}

.welcome-main {
  font-size: 3.8rem;
  color: white;
  font-weight: 600;
}

.welcome-desc {
  font-size: 1.8rem;
  font-style: italic;
  font-weight: lighter;
  color: #0080ff;
}


</style>
