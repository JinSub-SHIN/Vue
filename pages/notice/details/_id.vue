<template>
  <div>
    <NoticeDetailVue />
  </div>
</template>

<script>
import NoticeDetailVue from "../../../components/pages/NoticeDetail.vue";
export default({
  data() {
    return {
      string: "공지사항 상세",
    };
  },

  components: {
    NoticeDetailVue
  },

  validate({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id);
  },
});
</script>

<style lang="scss" scoped></style>
