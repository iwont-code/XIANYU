<template>
  <div>
    <el-form :model="form" ref="form" :rules="rules" class="form">
      <el-form-item prop="username">
        <el-input type="text" v-model="form.username" placeholder="請輸入用戶名/手機"></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input type="text" v-model="form.captcha" placeholder="請輸入6位數驗證碼">
          <template slot="append">
            <el-button @click="handleSendCaptcha">發送驗證碼</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="nickname">
        <el-input type="text" v-model="form.nickname" placeholder="請輸入姓名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="form.password" placeholder="請輸入密碼"></el-input>
      </el-form-item>
      <el-form-item prop="checkPassword">
        <el-input type="password" v-model="form.checkPassword" placeholder="請再次填寫密碼"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="submit" @click="handleRegSubmit">註冊</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { log } from "util";
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        //   如果再次輸入密碼為空，返回new 返回Error中的錯誤信息
        callback(new Error("請再次輸入密碼"));
      } else if (value !== this.form.password) {
        callback(new Error("輸入的密碼不一致，請重新輸入"));
      } else {
        callback();
      }
    };
    return {
      // 表單數據
      form: {
        username: "",
        captcha: "",
        nickname: "",
        password: "",
        checkPassword: ""
      },
      // 表單驗證規則
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur"
          }
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkPassword: [
          // validator 验证函数
          { validator: validatePass, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 獲取驗證碼
    handleSendCaptcha() {
      // 验证手机号码是否为空
      if (!this.form.username) {
        this.$confirm("手機號碼不能為空", "提示", {
          confirmButtonText: "確定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
      // 验证手机号码格式
      if (this.form.username.length !== 11) {
        this.$confirm("手機號碼格式錯誤", "提示", {
          confirmButtonText: "確定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
      // 验证后调用获取验证码的接口
      this.$axios({
        url: "/captchas",
        method: "POST",
        // 数据是输入的手机号码
        data: { tel: this.form.username }
      }).then(result => {
        // 獲取模拟验证码
        const { code } = result.data;
        this.$confirm(`模拟验证码为：${code}`, "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
      });
    },
    // 提交註冊
    handleRegSubmit() {
      // console.log(this.form);
      // 表单的验证
      // 提交注册不需要checkPassword, 所以从form中解构出来，...porps等于剩下值
      const { checkPassword, ...porps } = this.form;
      this.$refs.form.validate(valid => {
        if (valid) {
            // 调用注册接口
          this.$axios({
            url: "/accounts/register",
            method: "POST",
            data: porps
          }).then(result=>{
            //   注册成功后调用登录的方法直接进行登录
              this.$store.commit('user/setUserInfo',result.data)
              // 跳转到主页
              this.$router.push('/')
          })
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.form {
  padding: 20px;
  .submit {
    width: 100%;
    background-color: #409eff;
    color: #fff;
  }
}
</style>
