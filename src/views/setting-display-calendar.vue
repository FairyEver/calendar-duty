<style lang="scss">
.setting-display-calendar {
  padding-bottom: 20px;
}
</style>

<template>
  <div class="setting-display-calendar">
    <van-cell-group title="显示范围">
      <setting-cell-switch title="从当前月开始" label="关闭此选项将展示当月之前的日期" path="START_FROM_CURRENT_MONTH"/>
      <setting-cell-switch title="结束于当前月" label="关闭此选项将展示当月之后的日期" path="END_AT_CURRENT_MONTH"/>
    </van-cell-group>
    <van-cell-group title="周六">
      <setting-cell-switch title="高亮周六" path="DISPLAY.CALENDAR.HL_SAT"/>
      <setting-cell-switch title="高亮非法定节假日的周六" path="DISPLAY.CALENDAR.HL_SAT_N_H"/>
    </van-cell-group>
    <van-cell-group title="周日">
      <setting-cell-switch title="高亮周日" path="DISPLAY.CALENDAR.HL_SUN"/>
      <setting-cell-switch title="高亮非法定节假日的周日" path="DISPLAY.CALENDAR.HL_SUN_N_H"/>
    </van-cell-group>
    <van-cell-group title="法定节假日">
      <setting-cell-switch title="高亮法定节假日" path="DISPLAY.CALENDAR.HL_HOL"/>
    </van-cell-group>
    <tips :value="['周六和周日不一定是法定节假日', '法定节假日不仅包含周六和周日']"/>
  </div>
</template>

<script>
export default {
  name: 'setting-display-calendar'
}
</script>
