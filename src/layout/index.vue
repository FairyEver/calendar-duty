<style lang="scss">
.layout-calendar {
  height: 100%;
  .layout-calendar--header {
    height: $headerHeight;
    line-height: $headerHeight;
    .van-nav-bar__title {
      font-size: $headerFontSize;
      font-weight: $headerFontWeight;
    }
    .van-nav-bar__left {
      font-size: $headerFontSize;
      font-weight: $headerFontWeight;
    }
    .van-nav-bar__right {
      font-size: $headerFontSize;
      font-weight: $headerFontWeight;
    }
    .van-nav-bar__arrow {
      font-size: $headerFontSize + 4px;
    }
  }
  .layout-calendar--main {
    overflow: auto;
    background-color: #F7F8FA;
  }
  .layout-calendar--footer {
    height: 60px !important;
    .van-tabbar {
      height: 60px;
      .van-tabbar-item__text {
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
}
</style>

<template>
  <div class="layout-calendar" flex="dir:top main:justify box:justify">
    <van-nav-bar
      class="layout-calendar--header"
      :left-arrow="leftArrow"
      :left-text="leftText"
      :title="$route.meta.title"
      @click-left="onNavbarClickLeft"/>
    <div class="layout-calendar--main">
      <router-view/>
    </div>
    <div class="layout-calendar--footer">
      <van-tabbar route>
        <van-tabbar-item replace to="/" icon="calender-o">日历</van-tabbar-item>
        <van-tabbar-item replace to="/setting" icon="setting-o">设置</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'layout-calendar',
  computed: {
    leftArrow () {
      return !!this.$route.meta.back
    },
    leftText () {
      return this.leftArrow ? (this.$route.meta.back.title || '返回') : ''
    }
  },
  methods: {
    onNavbarClickLeft () {
      const to = this.$route.meta.back.to
      if (to) this.$router.push(to)
      else this.$router.go(-1)
    }
  }
}
</script>
