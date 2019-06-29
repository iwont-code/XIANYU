<template>
  <div class="container">
    <!-- 轮播图 -->
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <div
          class="banner-image"
          :style="`
        background:url(${$axios.defaults.baseURL + item.url}) center center no-repeat;
        background-size:contain contain;
        `"
        ></div>
      </el-carousel-item>
    </el-carousel>
    <!-- 搜索框 -->
    <div class="banner-content">
      <!-- tab栏 -->
      <div class="search-bar">
        <el-row type="flex" class="search-tab">
          <span
            v-for="(item,index) in options"
            :key="index"
            @click="handleOption(index)"
            :class="{active:currentOption===index}"
          >
            <i>{{item.name}}</i>
          </span>
        </el-row>
        <!-- 输入框 -->
        <el-row type="flex" align="middle" class="search-input">
          <input
            :placeholder="options[currentOption].placeholder"
            @keydown.enter="handleSearch"
            v-model="searchValue"
          >
          <!-- 输入框图标 -->
          <i class="el-icon-search" @click="handleSearch"></i>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 轮播图数据
      banners: [],
      // tab栏数据
      options: [
        {
          name: "攻略",
          placeholder: "搜索城市",
          pageUrl: "/post?city="
        },
        {
          name: "酒店",
          placeholder: "输入城市搜索酒店",
          pageUrl: "/hotel?city="
        },
        {
          name: "机票"
        }
      ],
      // 当前的tab栏
      currentOption: 0,
      searchValue: ""
    };
  },
  methods: {
    // 点击tab栏的事件
    handleOption(index) {
      // 如果索引为2 跳转到机票页面
      if (index === 2) {
        // nuxt支持$router和toute
        this.$router.push("/air");
      }
      // 点击时当前tab高亮 active
      this.currentOption = index;
    },
    // 搜索页跳转
    handleSearch() {
      // 获取输入框的值 ，this.searchValue
      const url = this.options[this.currentOption].pageUrl + this.searchValue
      this.$router.push(url)
    }
  },
  mounted() {
    this.$axios({
      url: "/scenics/banners"
    }).then(result => {
      // 从获取的数据中解构出数据
      const { data } = result.data;
      // 将轮播图数据放入banners
      this.banners = data;
    });
  }
};
</script>

<style scope lang='less'>
.container {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;

  .el-carousel__container {
    height: 700px;
  }

  .banner-image {
    width: 100%;
    height: 100%;
  }

  .banner-content {
    z-index: 9;
    width: 1000px;
    position: absolute;
    left: 50%;
    top: 45%;
    margin-left: -500px;
    border-top: 1px transparent solid;

    .search-bar {
      width: 552px;
      margin: 0 auto;
    }

    .search-tab {
      .active {
        i {
          color: #333;
        }
        &::after {
          background: #eee;
        }
      }

      span {
        width: 82px;
        height: 36px;
        display: block;
        position: relative;
        margin-right: 8px;
        cursor: pointer;

        i {
          position: absolute;
          z-index: 2;
          display: block;
          width: 100%;
          height: 100%;
          line-height: 30px;
          text-align: center;
          color: #fff;
        }

        &:after {
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          content: "";
          width: 100%;
          height: 100%;
          border: 1px rgba(255, 255, 255, 0.2) solid;
          border-bottom: none;
          transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
          transform-origin: bottom left;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 1px 2px 0 0;
          box-sizing: border-box;
        }
      }
    }

    .search-input {
      width: 550px;
      height: 46px;
      background: #fff;
      border-radius: 0 4px 4px 4px;
      border: 1px rgba(255, 255, 255, 0.2) solid;
      border-top: none;
      box-sizing: unset;

      input {
        flex: 1;
        height: 20px;
        padding: 13px 15px;
        outline: none;
        border: 0;
        font-size: 16px;
      }

      .el-icon-search {
        cursor: pointer;
        font-size: 22px;
        padding: 0 10px;
        font-weight: bold;
        color: #409eff;
      }
    }
  }
}
</style>
