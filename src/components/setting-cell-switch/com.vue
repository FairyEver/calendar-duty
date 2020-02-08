<template>
  <van-cell :title="title" :label="label" center>
    <van-switch
      v-model="currentValue"
      slot="right-icon"
      size="24"
      @change="commit"/>
  </van-cell>
</template>

<script>
import settingCell from '@/mixin/setting-cell.js'

export default {
  name: 'setting-cell-switch',
  mixins: [settingCell],
  data () {
    return {
      currentValue: false
    }
  }
}
</script>
