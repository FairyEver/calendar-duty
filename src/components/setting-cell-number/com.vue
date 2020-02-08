<template>
  <van-field
    v-model="currentValue"
    :label="title"
    type="digit"
    placeholder="数字"
    input-align="right"
    @blur="commit(currentValue)"
  />
</template>

<script>
import settingCell from '@/mixin/setting-cell.js'

export default {
  name: 'setting-cell-number',
  mixins: [settingCell],
  data () {
    return {
      currentValue: 6
    }
  }
}
</script>
