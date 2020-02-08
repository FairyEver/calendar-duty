<style lang="scss">
.setting-display-calendar {}
</style>

<template>
  <div class="setting-display-calendar">
    <van-cell-group title="日历显示设置">
      <setting-cell-switch label="突出显示周六" path="DISPLAY.HIGHLIGHT_SHOW_SATURDAY"/>
      <setting-cell-switch label="突出显示非法定节假日的周六" path="DISPLAY.HIGHLIGHT_SHOW_SATURDAY_NOT_HOLIDAY"/>
      <setting-cell-switch label="突出显示周日" path="DISPLAY.HIGHLIGHT_SHOW_SUNDAY"/>
      <setting-cell-switch label="突出显示非法定节假日的周日" path="DISPLAY.HIGHLIGHT_SHOW_SUNDAY_NOT_HOLIDAY"/>
      <setting-cell-switch label="突出显示法定节假日" path="DISPLAY.HIGHLIGHT_SHOW_HOLIDAY"/>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'setting-display-calendar'
}
</script>
