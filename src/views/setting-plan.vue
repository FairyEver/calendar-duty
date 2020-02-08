<style lang="scss">
.setting-plan {}
</style>

<template>
  <div class="setting-plan">
    <van-cell-group title="开关">
      <setting-cell-switch label="开启" path="PLAN[1].ACTIVE"/>
    </van-cell-group>
    <van-cell-group title="基础信息">
      <setting-cell-input label="名称" path="PLAN[1].TITLE"/>
      <setting-cell-input label="日期" path="PLAN[1].START"/>
      <setting-cell-number label="周期" path="PLAN[1].INTERVAL"/>
    </van-cell-group>
    <van-cell-group title="排除设置">
      <setting-cell-switch label="排除周六" path="PLAN[1].EXCLUDE_SATURDAY"/>
      <setting-cell-switch label="排除周日" path="PLAN[1].EXCLUDE_SUNDAY"/>
      <setting-cell-switch label="排除法定节假日" path="PLAN[1].EXCLUDE_HOLIDAY"/>
    </van-cell-group>
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
      default: '1',
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
          if (this.index === 0) handleError()
        } break
        default:
          break
      }
    }
  }
}
</script>
