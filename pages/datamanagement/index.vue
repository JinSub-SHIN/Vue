<template lang="pug">
div
    DataListVue
</template>

<script>
import DataListVue from "../../components/pages/datamanagement/DataList.vue";
import TestVue from "../../components/pages/datamanagement/Test.vue";
    export default {
        data() {
            return {
                string : "자료 관리"
            }
        },

        components : {
             DataListVue , TestVue
        }
    }
</script>

<style lang="scss" scoped>

</style>