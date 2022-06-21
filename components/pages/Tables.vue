<template lang="pug">
div
    a-row(type="flex" justify="center" )
        a-col(span="2") 
        a-col(span="5") 
        a-col(span="3") 
        a-col(span="3") 
        a-col.col-button(span="3")
            nuxt-link(to="/notice/create") 
                a-button.button(type=primary) 작성하기
    a-row.row-title(type="flex" justify="center")
        a-col.col-title(span="2") 순번
        a-col.col-title(span="5") 내용
        a-col.col-title(span="3") 작성일자
        a-col.col-title(span="3") 유효일자
        a-col.col-title(span="3") 작성자
    a-row.row-content(type="flex" justify="center" v-for="(data, i) in data.dataArray" v-bind:key="i")
        a-col.col-content(span="2" @click="getDetail(data.noti_seq)") {{data.noti_seq}}
        a-col.col-content(span="5" @click="getDetail(data.noti_seq)") {{data.content}}
        a-col.col-content(span="3" @click="getDetail(data.noti_seq)") {{data.save_time}}
        a-col.col-content(span="3" @click="getDetail(data.noti_seq)") {{data.effective_date}}
        a-col.col-content(span="3" @click="getDetail(data.noti_seq)") {{data.user_name}}

    infinite-loading(@infinite="infiniteHandler" spinner="waveDots")

</template>
<script>
import {
  defineComponent,
  reactive,
  toRaw,
  useStore,
  computed,
  useRouter,
  useContext,
} from "@nuxtjs/composition-api";
export default defineComponent({
  setup() {
    const vuex_store = useStore();
    const router = useRouter();
    const { $axios } = useContext();

    const data = reactive({
      dataArray: [],
      status: true,
      number: 2,
    });

    $axios
      .post("https://dev.watttalk.kr:8221/noticeRest/notice_admin_list", {
        page: 1,
        jwt: sessionStorage.getItem("user"),
      })
      .then((res) => {
        data.dataArray.push(...res.data);
      })
      .catch((err) => {
        console.log(err);
        error();
      });

    const infiniteHandler = ($state) => {
      $axios
        .post("https://dev.watttalk.kr:8221/noticeRest/notice_admin_list", {
          page: data.number,
          jwt: sessionStorage.getItem("user"),
        })
        .then((res) => {
          setTimeout(() => {
            if(res.data.length != 0) {
              data.dataArray.push(...res.data);
              $state.loaded();
              data.number++;
            } else {
              $state.complete();
            }
          }, 1000)
          
        })
        .catch((err) => {
          console.log(err);
          error();
        });
    };

    const getDetail = (number) => {
      router.push("/notice/details/" + number);
    };

    return {
      getDetail,
      data,
      infiniteHandler,
    };
  },
});
</script>
<style lang="scss">
.row-title {
  margin-bottom: 10px;
}

.col-title {
  background-color: #001f3f;
  opacity: 0.9;
  text-align: center;
  line-height: 50px;
  color: white;
}

.col-button {
  text-align: right;
  margin-bottom: 10px;
}

.button {
  font-size: 14px;
  height: 45px;
  background-color: #40a9ff;
  border-color: #40a9ff;
  color: white;
}

.row-content {
  margin-bottom: 2px;
}

.col-content {
  background-color: #001f3f;
  opacity: 0.7;
  text-align: center;
  line-height: 50px;
  color: white;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
}
</style>
