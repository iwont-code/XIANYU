<template>
  <div class="container">
    <el-row type="flex" justify="center" align="middle" class="main">
      <!-- 表单头部 -->
      <div class="formTab">
        <el-row type="flex" justify="center" class="tabs">
          <span :class="{active:currentTab === index}" 
          v-for="(item,index) in [`登录`,`注册`]" 
          :key="index"
          @click="handleClick(index)"
          >{{item}}</span>
        </el-row>
        <LoginForm v-if="currentTab === 0" />
        <RegisterForm v-if="currentTab === 1" />
      </div>
    </el-row>
  </div>
</template>
<script>
// 引入登录功能组件
import LoginForm from '@/components/user/LoginForm.vue'
// 引入注册功能组件
import RegisterForm from '@/components/user/RegisterForm.vue'

export default {
  data() {
    return {
      currentTab: 0
    };
  },
  methods:{
    handleClick(index){
      this.currentTab = index;
    }
  },
  components:{
    // 注册登录功能组件
    LoginForm,
    // 注册注册功能组件
    RegisterForm
  }
};
</script>
<style lang="less" scoped>
.container {
  background: url("http://157.122.54.189:9095/assets/images/th01.jfif") center 0;
  height: 700px;
  min-width: 1000px;
  .main{
    width: 1000px;
    height: 100%;
    margin: 0 auto;
    position: relative;
    .formTab{
      width: 400px;
      margin: 0 auto;
      background-color: #fff;
      box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.2);
      .tabs{
        span{
          display: block;
          height: 50px;
          background-color:#ccc;
          width: 50%;
          text-align: center;
          line-height: 46px;
          box-sizing: border-box;
          cursor: pointer;
          border-top:4px solid #ccc;
          &.active{
            border-top-color: orange;
            background-color: #fff;;
            color:orange;
            font-weight: 600;
          }
        }
      }
    }
  }
}
</style>
