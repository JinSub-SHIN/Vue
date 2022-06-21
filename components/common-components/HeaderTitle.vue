<template>
  <div>
    <section class="welcome-section">
      <p class="title">{{formState.name}}</p>
    </section>
  </div>
</template>

<script>
import {
  defineComponent,
  useRoute,
  useRouter,
  reactive,
  toRaw,
  useStore,
  computed,
} from "@nuxtjs/composition-api";
// import { watch } from "@vue/composition-api";
export default defineComponent({
  setup(){    
    const Route = useRoute();
    const store = useStore();

var name = store.getters["header/getUrl"](Route.value.name);
    const formState = reactive({
      name: name,
    });
    return {
      formState,
    }

  },

  watch: {
    const: function ( n , o ) {
      console.log("실행됨");
      this.formState.name = n + " 에서 " +  o + " 로 바뀜";
    }
  }
});






</script>

<style lang="scss" scoped>
.welcome-section {
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;
  margin-bottom: 50px;
  background-image: linear-gradient(to bottom right, #001f3f, #111111);
}

.title {
  color: white;
  position: absolute;
  bottom: 7%;
  left: 10%;
  font-size: 18px;
}
</style>
