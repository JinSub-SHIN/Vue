<template lang="pug">
div
    //- HeaderTitleVue(:title="string")
    //- TestVue
    DataListVue
</template>

<script>
import HeaderTitleVue from "../../components/common-components/HeaderTitle.vue";
import DataListVue from "../../components/pages/datamanagement/DataList.vue";
import TestVue from "../../components/pages/datamanagement/Test.vue";
    export default {
        data() {
            return {
                string : "자료 관리"
            }
        },

        components : {
            HeaderTitleVue , DataListVue , TestVue
        }
    }
</script>

<style lang="scss" scoped>

</style>