<template>
  <div>
    <span class="menuTitle">{{ id }}</span>
  </div>
</template>

<script>
import {
  defineComponent,
  useRouter,
  reactive,
  useStore,
  computed,
} from "@nuxtjs/composition-api";
export default defineComponent({
  setup() {
      const store = useStore();
      const id = computed(() => store.state.header.headerTitle);
      return {
          id,
      }
  },
});
</script>

<style lang="scss" scoped>
.menuTitle {
  color: white;
  line-height: 100px;
}
</style>
