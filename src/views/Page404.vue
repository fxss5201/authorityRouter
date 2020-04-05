<template>
  <div class="page-404">
    <div>
      <div class="title">404</div>
      <div class="desc">Page is not found!</div>
      <div @click="goBack" class="go-back">返回上个页面</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page404',
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-404 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .title {
    font-size: 24px;
    line-height: 2;
  }
  .desc {
    font-size: 18px;
    line-height: 1.5;
  }
  .go-back {
    font-size: 16px;
    line-height: 1.5;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
