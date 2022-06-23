<template>
  <div style="padding: 2rem;">
    <a-row :gutter="[16, 16]" v-for="item in state.items" :key="item.id">
      <a-col :span="6" v-for="item in state.subitems" :key="item.id">
        <a-card title="제목을 입력해주세요" :bordered="false" hoverable>
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
      items: 2,
      subitems: 4,
    });

    return {
      state,
    };
  },
});
</script>

<style lang="scss" scoped></style>
