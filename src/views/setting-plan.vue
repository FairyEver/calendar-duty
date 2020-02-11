<style lang="scss">
.setting-plan {
  padding-bottom: 20px;
}
</style>

<template>
  <div class="setting-plan">
    <van-cell-group title="开关">
      <setting-cell-switch title="开启" :path="`PLAN[${index}].ACT`"/>
    </van-cell-group>
    <van-cell-group title="基础">
      <setting-cell-input title="名称" :path="`PLAN[${index}].NAME`"/>
      <setting-cell-date title="日期" :path="`PLAN[${index}].DATE`"/>
      <setting-cell-stepper title="周期" :path="`PLAN[${index}].INTERVAL`"/>
    </van-cell-group>
    <van-cell-group title="显示">
      <setting-cell-picker title="位置" :path="`PLAN[${index}].P`" :picker-options="optionsP"/>
      <setting-cell-picker title="颜色" :path="`PLAN[${index}].C`" :picker-options="optionsC"/>
    </van-cell-group>
    <van-cell-group title="排除">
      <setting-cell-switch title="排除周六" label="排除所有(包含非法定节假日的)周六" :path="`PLAN[${index}].EX_SAT`"/>
      <setting-cell-switch title="排除周日" label="排除所有(包含非法定节假日的)周日" :path="`PLAN[${index}].EX_SUN`"/>
      <setting-cell-switch title="排除法定节假日" label="单独开启此项只排除国家法定节假日" :path="`PLAN[${index}].EX_HOL`"/>
    </van-cell-group>
  </div>
</template>

<script>
import { isNaN } from 'lodash'
import setting from '@/setting.js'
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
  data () {
    return {
      optionsP: [
        { label: '日期数字之上', value: 'top' },
        { label: '日期数字之下', value: 'bottom' }
      ],
      optionsC: setting.colors
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
