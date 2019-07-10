<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :data="cacheSetDataList" @setDataList="setDataList" />

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <div>
          <!-- 航班列表 -->
          <FlightsItem v-for="(item,index) in dataList" :key="index" :data="item" />
          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 20, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
import FlightsFilters from "@/components/air/flightsFilters.vue";
import { log } from 'util';

export default {
  data() {
    return {
      // flightsData  航班的总数据
      flightsData: {
        info: {},
        flights: {},
        options: {}
      },
      // 航班列表数据，用于循环flightsFilters组件，单独出来是因为要分页
      dataList: [],
      cacheSetDataList:{
        info: [],
        flights: {},
        options: {}
      },
      // 当前页数
      pageIndex: 1,
      // 显示条数
      pageSize: 5,
      total:0
    };
  },
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters
  },
  methods: {
    // 获取航班总数据
    getData() {
      this.$axios({
        url: "/airs",
        params: this.$route.query // 来自url的五个参数
      }).then(result => {
        this.flightsData = result.data;
        // console.log(result.data);
        this.total = result.data.total
        // 初始化数据
        // 设置属性时调用了flightsData.flights,所以这里可以直接调用setDataList
        // this.setDataList();
        //   缓存数据，一旦被赋值之后不能修改
        this.cacheSetDataList = {...result.data}
        this.setDataList()
        console.log(result.data)
      });
    },

    // 设置datalist数据
    setDataList(arr) {
      // console.log(arr)
      if(arr){
        this.flightsData.flights = arr;
        this.pageIndex = 1;
        this.total = arr.length;
        // return;
      }

      // 若index=2每页条数5，则等于(2-1)*5,start=5,end=10,表示第二页是5-10条数据
      const start = (this.pageIndex - 1) * this.pageSize;
      const end = start + this.pageSize;
      // 数组切割，start--从哪里开始，end--到哪里结束
      this.dataList = this.flightsData.flights.slice(start, end);
      // console.log(this.dataList)
    },

    // value 是选择时传过去的值
    handleSizeChange(value) {
      this.pageSize = value;
      this.pageIndex = 1;
      this.setDataList();
    },
    // value 是点击时传过去的值
    handleCurrentChange(value) {
      this.pageIndex = value;
      this.setDataList();
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>