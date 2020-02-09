<style lang="scss">
.setting-version {}
</style>

<template>
  <div class="setting-version">
    <van-cell-group title="版本信息">
      <van-cell title="版本号" :value="$env.VUE_APP_VERSION"/>
      <van-cell title="更新时间" :value="updateTime"/>
    </van-cell-group>
  </div>
</template>

<script>
import { format } from '@/util/time.js'
export default {
  name: 'setting-version',
  data () {
    return {
      updateTime: format(this.$env.VUE_APP_BUILD_TIME, 'YYYY/M/D h:mm')
    }
  }
}
</script>
