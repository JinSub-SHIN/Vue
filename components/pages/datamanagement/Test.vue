<template lang="pug">
div
    a-row(type="flex" justify="center")
        a-col(span="2") 
        a-col(span="6") 
        a-col(span="4") 
        a-col(span="4") 
        a-col.col-button(span="4")
            nuxt-link(to="/notice/create") 
                a-button.button(type=primary) 작성하기
    a-row.row-title(type="flex" justify="center")
        a-col.col-title(span="2") 순번
        a-col.col-title(span="6") 내용
        a-col.col-title(span="4") 작성일자
        a-col.col-title(span="4") 유효일자
        a-col.col-title(span="4") 작성자
    a-row.row-content(type="flex" justify="center" v-for="(myVal, i) in myVal" v-bind:key="i")
        a-col.col-content(span="2" @click="getDetail(i+1)") {{myVal.seq}}
        a-col.col-content(span="6" @click="getDetail(i+1)") {{myVal.desc}}
        a-col.col-content(span="4" @click="getDetail(i+1)") {{myVal.expiration}}
        a-col.col-content(span="4" @click="getDetail(i+1)") {{myVal.dateCreate}}
        a-col.col-content(span="4" @click="getDetail(i+1)") {{myVal.name}}   
</template>
<script>
import {
  defineComponent,
  reactive,
  toRaw,
  useStore,
  computed,
  useRouter,
} from "@nuxtjs/composition-api";
export default defineComponent({
  setup() {
    const vuex_store = useStore();
    const router = useRouter();

    const getDetail = (number) => {
      router.push("/notice/details/"+number);      
    }

    return {
      myVal: computed(() => vuex_store.state.notice.list),
      getDetail
    };
  },
});
</script>
<style lang="scss">
.row-title {
  margin-bottom: 10px;
}

.col-title {
  background-color: #001f3f;
  opacity: 0.9;
  text-align: center;
  line-height: 50px;
  color: white;
}

.col-button {
  text-align: right;
  margin-bottom: 10px;
}

.button {
  font-size: 14px;
  height: 45px;
  background-color: #40a9ff;
  border-color: #40a9ff;
  color: white;
}

.row-content {
  margin-bottom: 2px;
}

.col-content {
  background-color: #001f3f;
  opacity: 0.7;
  text-align: center;
  line-height: 50px;
  color: white;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
}
</style>
