<style lang="scss">
.setting {}
</style>

<template>
  <div class="setting">
    <van-cell-group title="任务设置">
      <van-cell title="任务 1" is-link :to="{ name: 'setting-plan', params: { index: 1 } }"/>
      <van-cell title="任务 2" is-link :to="{ name: 'setting-plan', params: { index: 2 } }"/>
    </van-cell-group>
    <van-cell-group title="显示设置">
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
  name: 'setting'
}
</script>
