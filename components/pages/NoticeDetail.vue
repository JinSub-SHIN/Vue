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
          <a-select-option value="Watt">Watt</a-select-option>
          <a-select-option value="JS">JS Company</a-select-option>
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
          >수정
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
  useRoute,
  useRouter,
  reactive,
  toRaw,
  useStore,
  computed,
  watch,
  useContext,
} from "@nuxtjs/composition-api";
export default defineComponent({
  setup() {
    const router = useRouter();
    const vuex_store = useStore();
    const route = useRoute();
    const id = parseInt(route.value.params.id);
    // var data = vuex_store.getters["notice/getData"](id);

    console.log(id);

    const { $axios } = useContext();

    const formState = reactive({
      name: "",
      region: undefined,
      expiration: undefined,
      desc: "",
    });

    $axios
      .post("https://dev.watttalk.kr:8221/noticeRest/noti_info_one", {
        noti_seq: id,
        jwt: sessionStorage.getItem("user"),
      })
      .then((res) => {
        formState.name = res.data[0].user_name;
        formState.region = res.data[0].en_alias;
        formState.desc = res.data[0].content;
        formState.expiration = '2022-06-21 09:17:11'; 
      })
      .catch((err) => {
        console.log(err);
        error();
      });

    

    const historyBack = () => {
      router.push("/notice");
    };

    const onSubmit = (e) => {
      e.preventDefault();

      console.log("submit!", toRaw(formState));
      var expiration = formState.expiration;
      var desc = formState.desc;
      var region = formState.region;
      var name = formState.name;

      var array = [];

      array.push(id + 1);
      array.push(desc);
      array.push(expiration);
      array.push(expiration);
      array.push(name);
      array.push(region);

      console.log(array);
      vuex_store.commit("notice/setData", array);
      router.push("/notice");
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

  // methods: {
  //   historyBack: function () {
  //     this.$router.push("/");
  //   },
  // },
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
  max-width: 60px !important;
  min-width: 60px !important;
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
</style>
