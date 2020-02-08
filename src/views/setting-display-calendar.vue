<style lang="scss">
.setting-display-calendar {}
</style>

<template>
  <div class="setting-display-calendar">
    <van-cell-group title="周六">
      <setting-cell-switch
        title="高亮周六"
        path="DISPLAY.CALENDAR.HIGHLIGHT_SHOW_SATURDAY"/>
      <setting-cell-switch
        title="高亮非法定节假日的周六"
        path="DISPLAY.CALENDAR.HIGHLIGHT_SHOW_SATURDAY_NOT_HOLIDAY"/>
    </van-cell-group>
    <van-cell-group title="周日">
      <setting-cell-switch
        title="高亮周日"
        path="DISPLAY.CALENDAR.HIGHLIGHT_SHOW_SUNDAY"/>
      <setting-cell-switch
        title="高亮非法定节假日的周日"
        path="DISPLAY.CALENDAR.HIGHLIGHT_SHOW_SUNDAY_NOT_HOLIDAY"/>
    </van-cell-group>
    <van-cell-group title="法定节假日">
      <setting-cell-switch
        title="高亮法定节假日"
        path="DISPLAY.CALENDAR.HIGHLIGHT_SHOW_HOLIDAY"/>
    </van-cell-group>
    <van-divider dashed>提示</van-divider>
    <van-cell-group class="is-mb-20">
      <van-cell value="周六和周日不一定是法定节假日"/>
      <van-cell value="法定节假日不仅包含周六和周日"/>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'setting-display-calendar'
}
</script>
