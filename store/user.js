// store 下的每个文件都是实例，不需要手动创建，只需要暴露store的属性

export const state = () => ({
  userInfo: {
    // name:'富婆',
    token: "",
    user: {}
  }
});

export const mutations = {
  // 获取用户数据
  setUserInfo(state, data) {
    // 设置用户数据
    state.userInfo = data;
  },
  // 清除用户数据
  clearUserInfo(state) {
    // 重置用户信息
    state.userInfo = {
      token: "",
      user: {}
    };
  }
};

// 存放公共的异步方法
export const actions = {
  login({ commit }, data) {
    return this.$axios({
      url: "/accounts/login",
      method: "POST",
      data
    }).then(result => {
        // 当前模块调用mutations可以不加模块名称
      commit("setUserInfo", result.data);
      // 调用外部的成功的回调函数
      // 在Promise中可以通过Promise.resolve来调用成功的回调函数
      return Promise.resolve(result);
    })
  }
};
