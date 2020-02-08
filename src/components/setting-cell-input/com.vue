<template>
  <van-field
    v-model="currentValue"
    :label="title"
    placeholder="字符"
    input-align="right"
    @blur="commit(currentValue)"
  />
</template>

<script>
import settingCell from '@/mixin/setting-cell.js'

export default {
  name: 'setting-cell-input',
  mixins: [settingCell],
  data () {
    return {
      currentValue: ''
    }
  }
}
</script>
