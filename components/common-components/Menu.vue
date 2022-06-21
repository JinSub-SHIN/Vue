<template lang="pug">
nav.nav
    ul.list
        li.item 
        nuxt-link(to="/") 파일업로드       
        li.item 
        nuxt-link(to="/") 파일함
        li.item 
        nuxt-link(to="/notice") 공지사항
        li.item 
        nuxt-link(to="/main") 내 정보
        li.item 
        nuxt-link(to="/") 회원 정보
        li.item 
        nuxt-link(to="/") 디바이스 정보
        li.item 
        nuxt-link(to="/") 앱 정보
        li.item 
        nuxt-link(to="/") 기업 정보
        li.item 
        nuxt-link(to="/") 본부 정보
        li.item 
        nuxt-link(to="/") 자사 정보
        li.item 
        nuxt-link(to="/datamanagement") 자료 관리
        li.item 
        nuxt-link(to="/login" @click.native = "changeStatus") 로그아웃
</template>

<script>
import {
  defineComponent,
  useStore,
  useRouter,
} from "@nuxtjs/composition-api";
export default defineComponent({
  setup() {
    const store = useStore();
    const changeStatus = () => {
      sessionStorage.clear();
      store.commit("login/changeStatus");
    };
    return {
      changeStatus,
    };
  },
});
</script>

<style lang="scss" scoped>
a {
  color: black;
  font-weight: bold;
  text-decoration: none;
  white-space: nowrap;
}

.nuxt-link-active:link {
  color: black;
  font-weight: bold;
}

.nuxt-link-active:visited {
  color: black;
  font-weight: bold;
}

.nav {
  flex-grow: 1;
  height: 100%;
}

.list {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
  margin: 0 16px;
  padding: 0;
  list-style: none;
}

.item {
  padding: 14px;
  height: 100%;
  font-weight: 700;
  white-space: nowrap;
}
</style>
