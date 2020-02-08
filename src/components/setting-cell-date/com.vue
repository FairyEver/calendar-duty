<template>
  <van-field
    v-model="currentValue"
    :label="label"
    placeholder="输入框内容右对齐"
    input-align="right"
    @blur="commit(currentValue)"
  />
</template>

<script>
import settingCell from '@/mixin/setting-cell.js'

export default {
  name: 'setting-cell-date',
  mixins: [settingCell],
  data () {
    return {
      currentValue: ''
    }
  }
}
</script>
