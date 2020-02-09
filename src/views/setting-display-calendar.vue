<style lang="scss">
.setting-display-calendar {}
</style>

<template>
  <div class="setting-display-calendar">
    <van-cell-group title="周六">
      <setting-cell-switch title="高亮周六" path="DISPLAY.CALENDAR.HL_SATURDAY"/>
      <setting-cell-switch title="高亮非法定节假日的周六" path="DISPLAY.CALENDAR.HL_SATURDAY_N_H"/>
    </van-cell-group>
    <van-cell-group title="周日">
      <setting-cell-switch title="高亮周日" path="DISPLAY.CALENDAR.HL_SUNDAY"/>
      <setting-cell-switch title="高亮非法定节假日的周日" path="DISPLAY.CALENDAR.HL_SUNDAY_N_H"/>
    </van-cell-group>
    <van-cell-group title="法定节假日">
      <setting-cell-switch title="高亮法定节假日" path="DISPLAY.CALENDAR.HL_HOLIDAY"/>
    </van-cell-group>
    <tips
      :value="[
        '周六和周日不一定是法定节假日',
        '法定节假日不仅包含周六和周日'
      ]"/>
  </div>
</template>

<script>
export default {
  name: 'setting-display-calendar'
}
</script>
