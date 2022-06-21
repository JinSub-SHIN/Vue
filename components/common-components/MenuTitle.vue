<template>
  <div>
    <span class="menuTitle">{{ headertitle }}</span>
  </div>
</template>

<script>
export default {
  computed: {
      headertitle() {
          console.log(this.$store.state.header.headerTitle)
          return this.$store.state.header.headerTitle; 
    
        },
  }
};
</script>

<style lang="scss" scoped>
.menuTitle {
  color: white;
  line-height: 100px;
}
</style>
