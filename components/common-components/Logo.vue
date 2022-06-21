<template lang="pug">
nuxt-link(to="/")
    img(:src="headerlogo" style="height:25px;")
</template>

<script>
import headerlogo from '../../Images/logo_header.png';
    export default {
        data: function(){
            return {
                headerlogo : headerlogo
            }
        },
        
    }
</script>

<style lang="scss" scoped>

</style>