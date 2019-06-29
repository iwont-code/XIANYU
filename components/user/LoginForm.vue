<template>
  <div style="padding:20px;">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item prop="username">
        <el-input type="text" placeholder="请输入用户名/手机号码" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
      </el-form-item>
      <p>
        <a href="javascript:;">忘记密码？</a>
      </p>
      <el-button class="dl_btn" @click="handleSubmit">登录</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: "13800138000",
        password: "123456"
      },
      // 验证表单
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
      handleSubmit(){
          // validate 验证 返回布尔值
          this.$refs.form.validate((valid)=>{
              if(valid){
                  // 如果验证通过，调用登录接口
                //   this.$axios({
                //       url:"/accounts/login",
                //       method:"POST",
                //       data:this.form
                //   }).then(result=>{
                //       // 调用store方法把数据传过去
                //       this.$store.commit('user/setUserInfo',result.data)
                //       this.$message.success('登录成功')
                //       this.$router.push('/')
                //   })
                this.$store.dispatch("user/login",this.form).then(result=>{  // .then是Promise的回调
                    this.$message.success('登录成功')
                    this.$router.push('/')
                })
              }
          })
      }
  },
};
</script>
<style lang="less" scoped>
p {
  display: block;
  font-size: 12px;
  text-align: right;
  margin-bottom: 5px;
  a {
    color: #409eff;
  }
}
.dl_btn {
  width: 100%;
  background-color: #409eff;
  color: #fff;
}
</style>
