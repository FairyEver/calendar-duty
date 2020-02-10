<template>
  <div class="setting-cell-picker">
    <van-field
      placeholder="选择"
      :label="title"
      :value="pickerValueLabel"
      input-align="right"
      @click="open"
      readonly
      clickable/>
    <van-popup v-model="picker.show" position="bottom">
      <van-picker
        :columns="columns"
        :default-index="pickerValueIndex"
        @cancel="close"
        @confirm="confirm"
        show-toolbar/>
    </van-popup>
  </div>
</template>

<script>
import settingCell from '@/mixin/setting-cell.js'

export default {
  name: 'setting-cell-picker',
  mixins: [settingCell],
  props: {
    pickerOptions: {
      type: Array,
      default: () => [],
      required: false
    }
  },
  data () {
    return {
      picker: {
        show: false
      },
      currentValue: ''
    }
  },
  computed: {
    /**
     * @description 选择器使用的选项数组
     */
    columns () {
      return this.pickerOptions.map(e => e.label)
    },
    /**
     * @description 当前的 value 对应的 index
     */
    pickerValueIndex () {
      const index = this.pickerOptions.findIndex(e => e.value === this.currentValue)
      return index < 0 ? 0 : index
    },
    /**
     * @description 当前的 value 对应的 label
     */
    pickerValueLabel () {
      return this.pickerOptions[this.pickerValueIndex].label
    }
  },
  methods: {
    /**
     * @description 打开选择器
     */
    open () {
      this.picker.show = true
    },
    /**
     * @description 关闭选择器
     */
    close () {
      this.picker.show = false
    },
    /**
     * @description 点击确定按钮
     */
    confirm (data) {
      const element = this.pickerOptions.find(e => e.label === data)
      if (element) {
        this.currentValue = element.value
        this.commit(this.currentValue)
      }
      this.close()
    }
  }
}
</script>
