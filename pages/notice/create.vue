<template lang="pug">
div
    //- HeaderTitleVue(:title="string")
    NoticeFormVue
</template>

<script>
import HeaderTitleVue from "../../components/common-components/HeaderTitle.vue";
import NoticeFormVue from "../../components/pages/NoticeForm.vue";
    export default {

        data() {
            return {
                string : "공지사항 작성"
            }
        },

        components : {
            HeaderTitleVue , NoticeFormVue
        }
    }
</script>

<style lang="scss" scoped>

</style>