<template lang="pug">
div
    a-row(type="flex" justify="center" )
        a-col(span="3") 
        a-col(span="8") 
        a-col(span="4") 
        a-col(span="4") 
        a-col.col-button(span="4")
            nuxt-link(to="/notice/create") 
                a-button.button(type=primary) 작성하기
    a-row.row-title(type="flex" justify="center")
        a-col.col-title(span="3") 순번
        a-col.col-title(span="8") 내용
        a-col.col-title(span="4") 작성일자
        a-col.col-title(span="4") 유효일자
        a-col.col-title(span="4") 작성자
    a-row.row-content(type="flex" justify="center" v-for="(data, i) in data.dataArray" v-bind:key="i")
        a-col.col-content(span="3" @click="getDetail(data.noti_seq)") {{data.noti_seq}}
        a-col.col-content(span="8" @click="getDetail(data.noti_seq)") {{data.content}}
        a-col.col-content(span="4" @click="getDetail(data.noti_seq)") {{data.save_time}}
        a-col.col-content(span="4" @click="getDetail(data.noti_seq)") {{data.effective_date}}
        a-col.col-content(span="4" @click="getDetail(data.noti_seq)") {{data.user_name}}

    infinite-loading(@infinite="infiniteHandler" spinner="waveDots")

</template>
<script>
import {
  defineComponent,
  reactive,
  useRouter,
  useContext,
} from "@nuxtjs/composition-api";
export default defineComponent({
  setup() {
    const router = useRouter();
    const { $axios } = useContext();

    const data = reactive({
      dataArray: [],
      status: true,
      number: 2,
    });

    const getTimeZone = (standard) => {
      const now = new Date(standard * 1000);
      const month = ("0" + (now.getMonth() + 1)).slice(-2);
      const date = ("0" + now.getDate()).slice(-2);
      const hours = ("0" + now.getHours()).slice(-2);
      const minutes = ("0" + now.getMinutes()).slice(-2);
      const seconds = ("0" + now.getSeconds()).slice(-2);

      // console.log(now);

      const convertToDate =
        now.getFullYear() +
        "-" +
        month +
        "-" +
        date +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;

      return convertToDate;
    };

    $axios
      .post("https://dev.watttalk.kr:8221/noticeRest/notice_admin_list", {
        page: 1,
        jwt: sessionStorage.getItem("user"),
      })
      .then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].effective_date = getTimeZone(res.data[i].effective_date);
          res.data[i].save_time = getTimeZone(res.data[i].save_time);
        }
        data.dataArray.push(...res.data);
      })
      .catch((err) => {
        // console.log(err);
        error(err);
      });

    const infiniteHandler = ($state) => {
      $axios
        .post("https://dev.watttalk.kr:8221/noticeRest/notice_admin_list", {
          page: data.number,
          jwt: sessionStorage.getItem("user"),
        })
        .then((res) => {
          setTimeout(() => {
            if (res.data.length != 0) {
              for (var i = 0; i < res.data.length; i++) {
                res.data[i].effective_date = getTimeZone(
                  res.data[i].effective_date
                );
                res.data[i].save_time = getTimeZone(res.data[i].save_time);
              }
              data.dataArray.push(...res.data);
              $state.loaded();
              data.number++;
            } else {
              $state.complete();
            }
          }, 1000);
        })
        .catch((err) => {
          // console.log(err);
          error(err);
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
