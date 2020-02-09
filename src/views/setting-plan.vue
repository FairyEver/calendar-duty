<style lang="scss">
.setting-plan {}
</style>

<template>
  <div class="setting-plan">
    <van-cell-group title="开关">
      <setting-cell-switch title="开启" :path="`PLAN[${index}].ACTIVE`"/>
    </van-cell-group>
    <van-cell-group title="基础信息">
      <setting-cell-input title="名称" :path="`PLAN[${index}].TITLE`"/>
      <setting-cell-input title="日期" :path="`PLAN[${index}].START`"/>
      <setting-cell-number title="周期" :path="`PLAN[${index}].INTERVAL`"/>
    </van-cell-group>
    <van-cell-group title="排除设置">
      <setting-cell-switch title="排除周六" :path="`PLAN[${index}].EX_SAT`"/>
      <setting-cell-switch title="排除周日" :path="`PLAN[${index}].EX_SUN`"/>
      <setting-cell-switch title="排除法定节假日" :path="`PLAN[${index}].EX_HOL`"/>
    </van-cell-group>
    <tips
      :value="[
        '周六和周日不一定是法定节假日',
        '法定节假日不仅包含周六和周日'
      ]"/>
  </div>
</template>

<script>
import { isNaN } from 'lodash'
export default {
  name: 'setting-plan',
  props: {
    // 可能是数字 也可能是字符串
    // 页面跳转的时候是数字 直接刷新是字符串
    // indexCheck 方法校验
    index: {
      default: '0',
      required: false
    }
  },
  created () {
    this.indexCheck()
  },
  methods: {
    /**
     * @description 校验 index 参数是否合法
     */
    indexCheck () {
      const handleError = () => this.$router.replace({ name: 'setting' })
      switch (typeof this.index) {
        case 'string': {
          if (isNaN(Number(this.index))) handleError()
        } break
        case 'number': {
          if (this.index < 0) handleError()
        } break
        default:
          break
      }
    }
  }
}
</script>
