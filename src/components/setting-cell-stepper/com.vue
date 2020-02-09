<template>
  <van-cell :title="title" :label="label" center>
    <van-stepper
      v-model="currentValue"
      @change="onChange"
      integer
      disable-input/>
  </van-cell>
</template>

<script>
import settingCell from '@/mixin/setting-cell.js'

export default {
  name: 'setting-cell-stepper',
  mixins: [settingCell],
  data () {
    return {
      currentValue: 6
    }
  },
  methods: {
    onChange (value) {
      this.commit(value)
    }
  }
}
</script>
