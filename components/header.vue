<template>
  <div class="header">
    <el-row type="flex" justify="space-between" class="main">
      <!-- LOGO -->
      <div class="logo">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg">
        </nuxt-link>
      </div>
      <!-- 菜单 -->
      <el-row type="flex" class="navs">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <!-- 登录注册 -->
      <div class="header_right">
        <div v-if="$store.state.user.userInfo.token">
          <a href="/" class="message">
            <i class="el-icon-message-solid message">消息</i>
          </a>
          <el-dropdown>
            <span class="el-dropdown-link">
              <img
                src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=588346851,1103615545&fm=27&gp=0.jpg"
                alt
              >
              {{$store.state.user.userInfo.user.nickname}}
              <i
                class="el-icon-arrow-down el-icon--right"
              ></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>
                <div @click="handleClick">退出</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="login-link" v-else>
          <router-link class="routerlk" to="/user/login">登录 / 注册</router-link>
        </div>
      </div>
    </el-row>
  </div>
</template>
<script>
export default {
  methods: {
    handleClick() {
      this.$store.commit("user/clearUserInfo");
      this.$message.success("退出成功");
    }
  }
};
</script>
<style lang="less" scope>
.header {
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #ccc;
  box-shadow: 0 1px 2px #ccc;
  .main {
    width: 1000px;
    margin: 0 auto;
    .logo {
      margin-top: 9px;
      margin-right: 20px;
      img {
        display: block;
        width: 156px;
        height: 42px;
      }
    }
    .navs {
      flex: 1;
      a {
        display: block;
        height: 60px;
        padding: 0 20px;
        box-sizing: border-box;
        &:hover {
          border-bottom: 5px solid #409eff;
          color: #409eff;
        }
        &:active {
          color: #fff;
          background-color: #409eff;
        }
      }
      .nuxt-link-exact-active {
        color: #fff !important;
        background-color: #409eff;
      }
    }
    .header_right {
      img {
        display: inline-block;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        vertical-align: middle;
      }
      .message {
        display: inline-block;
        font-size: 14px;
        margin-right: 5px;
      }
      .login-link{
        .routerlk{
          &:hover{
            color:#409eff;
            text-decoration: underline;
          }
        }
      }
    }
  }
}

</style>