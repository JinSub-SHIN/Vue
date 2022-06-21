<template>
  <div>
    <!-- <HeaderTitleVue :title="string" />     -->
    <NoticeDetailVue />
  </div>
</template>

<script>
import HeaderTitleVue from "../../../components/common-components/HeaderTitle.vue";
import NoticeDetailVue from "../../../components/pages/NoticeDetail.vue";
export default({
  data() {
    return {
      string: "공지사항 상세",
    };
  },

  components: {
    HeaderTitleVue, NoticeDetailVue
  },

  validate({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id);
  },
});
</script>

<style lang="scss" scoped></style>
