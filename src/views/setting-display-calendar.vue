<style lang="scss">
.setting-display-calendar {}
</style>

<template>
  <div class="setting-display-calendar">
    <van-cell-group title="周六">
      <setting-cell-switch
        label="高亮周六"
        path="DISPLAY.CALENDAR.HIGHLIGHT_SHOW_SATURDAY"/>
      <setting-cell-switch
        label="高亮非法定节假日的周六"
        path="DISPLAY.CALENDAR.HIGHLIGHT_SHOW_SATURDAY_NOT_HOLIDAY"/>
    </van-cell-group>
    <van-cell-group title="周日">
      <setting-cell-switch
        label="高亮周日"
        path="DISPLAY.CALENDAR.HIGHLIGHT_SHOW_SUNDAY"/>
      <setting-cell-switch
        label="高亮非法定节假日的周日"
        path="DISPLAY.CALENDAR.HIGHLIGHT_SHOW_SUNDAY_NOT_HOLIDAY"/>
    </van-cell-group>
    <van-cell-group title="法定节假日">
      <setting-cell-switch
        label="高亮法定节假日"
        path="DISPLAY.CALENDAR.HIGHLIGHT_SHOW_HOLIDAY"/>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'setting-display-calendar'
}
</script>
