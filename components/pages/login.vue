<template>
  <div class="login">
    <h1><Logo /></h1>
    <p style="margin-bottom: 30px"></p>
    <form v-on:submit="onFinish" :model="formState">
      <input
        type="text"
        name="username"
        placeholder="아이디"
        required="required"
        v-model="formState.username"
      />
      <input
        type="password"
        name="password"
        placeholder="비밀번호"
        required="required"
        v-model="formState.password"
      />
      <button type="submit" class="btn btn-primary btn-block btn-large">
        로그인
      </button>
      <p></p>
      <button
        type="button"
        class="btn btn-primary btn-block btn-large"
        style="background-color: deepskyblue; border: 1px solid deepskyblue"
        @click="warning"
      >
        회원가입
      </button>
    </form>
    <a-button @click="error" style="display: none">Error</a-button>
  </div>
</template>

<script>
import {
  defineComponent,
  useRouter,
  reactive,
  toRaw,
  useStore,
  computed,
  useContext,
} from "@nuxtjs/composition-api";
import { message } from "ant-design-vue";
import Logo from "../common-components/Logo.vue";
export default defineComponent({
  setup() {
    console.log("setup호출됨...");
    const store = useStore();
    const route = useRouter();
    const { $axios } = useContext();
    const formState = reactive({
      username: "",
      password: "",
      userToken: undefined,
    });

    const error = () => {
      message.error("회원정보가 없거나 비밀번호가 다릅니다.");
    };
    const warning = () => {
      message.warning("관리자에게 문의하세요");
    };
    const onFinish = (e) => {
      e.preventDefault();
      var username = formState.username;
      var password = formState.password;

      $axios
        .post("https://dev.watttalk.kr:8221/accountRest/user_id_pw_check", {
          id: username,
          password: password,
        })
        .then(function (res) {
          if (res.data[1] != null) {
            formState.userToken = res.data[2];
            // console.log(formState.userToken);
            sessionStorage.setItem("user", formState.userToken);
            store.commit("login/changeStatus");
            route.push("/");
          } else {
            error();
          }
        })
        .catch(function (err) {
          console.log(err);
          error();
          return;
        });

      return;

      //비밀번호 암호화 로직
      const crypto = require("crypto");
      password = crypto.createHash("sha512").update(password).digest("base64");
      // console.log(password);
      // var getpassword = store.getters.getPassword(username);
      var getpassword = store.getters["login/getPassword"](username);
      if (getpassword == undefined) {
        error();
        return;
      } else {
        getpassword = getpassword.password;
      }
      if (password === getpassword) {
        store.commit("login/changeStatus");
        route.push("/");
      } else {
        error();
      }
    };
    return {
      formState,
      onFinish,
      error,
      warning,
    };
  },
  components: { Logo },
});
</script>

<style lang="scss" scoped>
.btn {
  display: inline-block;
  *display: inline;
  *zoom: 1;
  padding: 4px 10px 4px;
  margin-bottom: 0;
  font-size: 13px;
  line-height: 18px;
  color: #333333;
  text-align: center;
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);
  vertical-align: middle;
  background-repeat: repeat-x;
  filter: progid:dximagetransform.microsoft.gradient(startColorstr=#ffffff, endColorstr=#e6e6e6, GradientType=0);
  border-color: #e6e6e6 #e6e6e6 #e6e6e6;
  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
  border: 1px solid #e6e6e6;
}
.btn-large {
  padding: 9px 14px;
  font-size: 15px;
  line-height: normal;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
.btn-primary,
.btn-primary:hover {
  //   text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
  color: #ffffff;
}
.btn-primary.active {
  color: rgba(255, 255, 255, 0.75);
}
.btn-primary {
  background-color: #4a77d4;
  border: 1px solid #3762bc;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.5);
}
.btn-primary:hover,
.btn-primary:active,
.btn-primary.active,
.btn-primary.disabled,
.btn-primary[disabled] {
  filter: none;
  background-color: #4a77d4;
}
.btn-block {
  width: 100%;
  display: block;
}

* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -o-box-sizing: border-box;
  box-sizing: border-box;
}

html {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

body {
  width: 100%;
  height: 100%;
  font-family: "Open Sans", sans-serif;
  background: #092756;
  background: -moz-radial-gradient(
      0% 100%,
      ellipse cover,
      rgba(104, 128, 138, 0.4) 10%,
      rgba(138, 114, 76, 0) 40%
    ),
    -moz-linear-gradient(top, rgba(57, 173, 219, 0.25) 0%, rgba(42, 60, 87, 0.4)
          100%),
    -moz-linear-gradient(-45deg, #670d10 0%, #092756 100%);
  background: -webkit-radial-gradient(
      0% 100%,
      ellipse cover,
      rgba(104, 128, 138, 0.4) 10%,
      rgba(138, 114, 76, 0) 40%
    ),
    -webkit-linear-gradient(top, rgba(57, 173, 219, 0.25) 0%, rgba(
            42,
            60,
            87,
            0.4
          )
          100%),
    -webkit-linear-gradient(-45deg, #670d10 0%, #092756 100%);
  background: -o-radial-gradient(
      0% 100%,
      ellipse cover,
      rgba(104, 128, 138, 0.4) 10%,
      rgba(138, 114, 76, 0) 40%
    ),
    -o-linear-gradient(top, rgba(57, 173, 219, 0.25) 0%, rgba(42, 60, 87, 0.4)
          100%),
    -o-linear-gradient(-45deg, #670d10 0%, #092756 100%);
  background: -ms-radial-gradient(
      0% 100%,
      ellipse cover,
      rgba(104, 128, 138, 0.4) 10%,
      rgba(138, 114, 76, 0) 40%
    ),
    -ms-linear-gradient(top, rgba(57, 173, 219, 0.25) 0%, rgba(42, 60, 87, 0.4)
          100%),
    -ms-linear-gradient(-45deg, #670d10 0%, #092756 100%);
  background: -webkit-radial-gradient(
      0% 100%,
      ellipse cover,
      rgba(104, 128, 138, 0.4) 10%,
      rgba(138, 114, 76, 0) 40%
    ),
    linear-gradient(
      to bottom,
      rgba(57, 173, 219, 0.25) 0%,
      rgba(42, 60, 87, 0.4) 100%
    ),
    linear-gradient(135deg, #670d10 0%, #092756 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#3E1D6D', endColorstr='#092756',GradientType=1 );
}
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -150px 0 0 -150px;
  width: 300px;
  height: 300px;
}
.login h1 {
  color: #fff;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  letter-spacing: 1px;
  text-align: center;
}

input {
  width: 100%;
  margin-bottom: 10px;
  background: rgba(0, 0, 0, 0.3);
  border: none;
  outline: none;
  padding: 10px;
  font-size: 13px;
  color: #fff;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  box-shadow: inset 0 -5px 45px rgba(100, 100, 100, 0.2),
    0 1px 1px rgba(255, 255, 255, 0.2);
  -webkit-transition: box-shadow 0.5s ease;
  -moz-transition: box-shadow 0.5s ease;
  -o-transition: box-shadow 0.5s ease;
  -ms-transition: box-shadow 0.5s ease;
  transition: box-shadow 0.5s ease;
}
input:focus {
  box-shadow: inset 0 -5px 45px rgba(100, 100, 100, 0.4),
    0 1px 1px rgba(255, 255, 255, 0.2);
}
</style>
