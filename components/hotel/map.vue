<template>
  <div id="container"></div>
</template>
<script>
export default {
  mounted() {
    window.onLoad = function() {
      var map = new AMap.Map("container");
    };
    var key="66544e3fbd1fbc2533e352c154238375"
    var url =
      `https://webapi.amap.com/maps?v=1.4.15&key=${key}&callback=onLoad`;
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
};
</script>
<style lang="less" scoped>
#container{
    border:3px solid red;
    padding:10px;
    margin:10px;
    width: 500px;
    height: 500px;
}
</style>
