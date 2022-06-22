<template>
  <div>
    <a-form
      :model="formState"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      v-on:submit="onSubmit"
    >
      <a-divider class="divider" />
      <a-form-item label="내용" required>
        <a-input
          v-model:value="formState.desc"
          type="textarea"
          class="textArea"
        />
      </a-form-item>

      <a-divider class="divider" />

      <a-form-item label="유효기간" required>
        <a-date-picker
          v-model:value="formState.expiration"
          show-time
          type="date"
          placeholder="기간 선택"
          style="width: 100%"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </a-form-item>

      <a-divider class="divider" />

      <a-form-item label="작성자">
        <a-input v-model:value="formState.name" disabled />
      </a-form-item>

      <a-divider class="divider" />
      <a-form-item label="소속" required>
        <a-select v-model:value="formState.region" placeholder="기업 선택">
          <a-select-option value="Watt">와트</a-select-option>
          <a-select-option value="Power1">파워톡</a-select-option>
          <a-select-option value="Power2">파워톡2</a-select-option>
        </a-select>
      </a-form-item>

      <a-divider class="divider" />
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button
          type="primary"
          class="tooltip"
          html-type="submit"
          :disabled="
            formState.region === undefined ||
            formState.expiration === undefined ||
            formState.desc === ''
          "
          >등록
          <span class="tooltiptext">필수 값을 입력하세요</span>
        </a-button>
        <a-button style="margin-left: 10px" @click="historyBack">목록</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import {
  defineComponent,
  useRouter,
  reactive,
  useStore,
  toRaw,
  useContext,
} from "@nuxtjs/composition-api";
import { message } from "ant-design-vue";
export default defineComponent({
  setup() {
    const formState = reactive({
      name: sessionStorage.getItem("userName"),
      region: undefined,
      expiration: undefined,
      desc: "",
    });
    const router = useRouter();
    const vuex_store = useStore();
    const { $axios } = useContext();

    const historyBack = () => {
      router.push("/notice");
    };

        const getTimeZone = (standard) => {
      const now = new Date(standard * 1000)
      const month = ("0" + (now.getMonth() + 1)).slice(-2)
      const date = ("0" + now.getDate()).slice(-2)
      const hours = ("0" + now.getHours()).slice(-2)
      const minutes = ("0" + now.getMinutes()).slice(-2)
      const seconds = ("0" + now.getSeconds()).slice(-2)

      console.log(now);

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
        seconds

      return convertToDate
    }

    const onSubmit = (e) => {
      e.preventDefault();
      console.log("submit!", toRaw(formState));
      var expiration = formState.expiration;
      var desc = formState.desc;
      var region = formState.region;
      var name = formState.name;

      var NumberDate = Math.floor(new Date(formState.expiration) / 1000);
      $axios
        .post("https://dev.watttalk.kr:8221/noticeRest/noti_insert", {
          en_seq: 1,
          content: desc,
          save_time : Math.floor(new Date() / 1000),
          jwt: sessionStorage.getItem('user'),
          effective_date : NumberDate
        })
        .then((res) => {
          console.log(res);
          router.push("/notice");
        })
        .catch((err) => {
          console.log(err);
          error();
        });      
    };
    return {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 17,
      },
      formState,
      onSubmit,
      historyBack,
    };
  },
});
</script>

<style lang="scss">
$minHeight: 150px;

.textArea {
  min-height: $minHeight !important;
}

.divider {
  background-color: gray;
  opacity: 0.5;
}

.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 150px;
  background-color: black;
  color: rgb(255, 27, 46);
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 150%;
  left: 50%;
  margin-left: -75px;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black transparent transparent transparent;
}

.tooltip:hover:disabled .tooltiptext {
  visibility: visible;
}

// .tooltip .tooltiptext {
//   width: 120px;
//   bottom: 100%;
//   left: 50%;
//   margin-left: -60px; /* Use half of the width (120/2 = 60), to center the tooltip */
// }
</style>
