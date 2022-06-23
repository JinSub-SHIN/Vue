<template>
  <div style="padding: 2rem;">
    <a-row :gutter="[16, 16]" v-for="(item1, index1) in state.items" :key="index1">
      <a-col :span="6" v-for="(item2, index2) in state.subitems" :key="index2">
        <a-card title="제목을 입력해주세요" :bordered="false" hoverable @click="clickHandler(item1)(item2)">
          <template #cover>
            <video controls muted>
              <source
                src="../../../videos/2022_0621_132521_p2test.mp4"
                type="video/mp4"
              />
            </video>
          </template>
          <h5>참여자: 피투테스트 외 1인</h5>
          <h5>소속: 연구소 웹</h5>
          <h5>2022-06-21 13:25:21 (20초)</h5>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { defineComponent, reactive } from "@nuxtjs/composition-api";
export default defineComponent({
  setup() {
    const state = reactive({
      items: 3,
      subitems: 4,
    });

    const clickHandler = (t) => (b) => {
      console.log(t+"|"+b);
    }    

    return {
      state,
      clickHandler,
    };
  },
});
</script>

<style lang="scss" scoped></style>
