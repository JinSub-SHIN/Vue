<template>
  <div>
    <!-- <HeaderTitleVue :title="string"/> -->
    <TablesVue />
  </div>
</template>

<script>
import TablesVue from "../../components/pages/Tables.vue";
import HeaderTitleVue from "../../components/common-components/HeaderTitle.vue";

export default {
        data() {
            return {
                string : "공지사항"
            }
        },

  components: {
    TablesVue,
    HeaderTitleVue,
  },
};
</script>

<style lang="scss" scoped></style>
