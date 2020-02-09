<style lang="scss">
.setting {}
</style>

<template>
  <div class="setting">
    <van-cell-group title="任务">
      <van-cell title="任务 1" is-link :to="{ name: 'setting-plan', params: { index: 0 } }"/>
      <van-cell title="任务 2" is-link :to="{ name: 'setting-plan', params: { index: 1 } }"/>
    </van-cell-group>
    <van-cell-group title="显示">
      <van-cell title="日历" is-link :to="{ name: 'setting-display-calendar' }"/>
    </van-cell-group>
    <van-cell-group title="关于">
      <van-cell title="版本" is-link :to="{ name: 'setting-version' }"/>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'setting'
}
</script>
