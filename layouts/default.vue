<template>
  <div>
    <Header/>
    <nuxt/>
    <Footer/>>
  </div>
</template>

<script>
import Header from "@/components/header";
import Footer from "@/components/footer";

export default {
  components: {
    Header,
    Footer
  },
};
</script>

<style lang="less">
// 全局默认样式
* {
  margin: 0;
  padding: 0;
}
ul,
li,
ol {
  list-style: none;
}
a {
  color: #333;
  text-decoration: none;
}
i,
em {
  font-style: normal;
}
</style>
