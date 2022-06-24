<template lang="pug">
a-layout
    a-layout-header.header
      div.header_inner          
        Logo 
        MenuVue
    a-layout-header.header2
      div
        MenuTitleVue
    a-layout 
      a-layout-sider.sider 
      a-layout-content.content
        div.content_inner             
          Nuxt
      a-layout-sider.sider 
    //- a-layout-content 내용들...
    a-layout-footer.footer
        div.footer_inner
</template>

<script>
import MenuVue from "../components/common-components/Menu.vue";
import Logo from "../components/common-components/Logo.vue";
import MenuTitleVue from "../components/common-components/MenuTitle.vue";
import { message } from "ant-design-vue";
export default {
  name: "Layout",
  components: { MenuVue, Logo , MenuTitleVue },

    watch: {
    $route(to, from) {
      console.log('route change to', to)
      console.log('route change from', from)
    },
  },

    // middleware({ redirect }) {
    //   // 만약 유저가 인증 받지 못한 경우 로그인 페이지로 이동합니다.
    //   // console.log(sessionStorage.getItem("user"));
    //   if (sessionStorage.getItem("user") === null) {
    //     message.error("로그인 후 이용하세요");
    //     return redirect("/login");
    //   }
    // },

};
</script>

<style lang="scss" scoped>
$height: 50px;
$maxWidth: 960px;
.sider {
  background-color: #4646581e;
}

.header2 {
  background-image: linear-gradient(to bottom right, #001f3f, #111111);
  margin-top: 60px;
  height: 100px;
}

.header {
  position: fixed;
  z-index: 10;
  width: 100%;
  height: height;
  background-color: white;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
}

.header_inner {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: maxWidth;
  margin: 0 auto;
  padding: 0 16px;
}

.content {
  margin-top: height;
  background-color: #4646581e;
  min-height: 800px;
}

.content_inner {
  max-width: maxWidth;
  margin-top : 50px;
  padding: 0 px;
}

.footer {
  background-color: #e2e2e2;
  color: hsla(0, 0%, 100%, 0.8);
}

.footer_inner {
  min-height: 70px;
  max-width: maxWidth;
  margin: 0 auto;
  padding: 0 16px;
}
</style>
