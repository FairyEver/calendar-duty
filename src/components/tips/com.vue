<style lang="scss">
.tips {
  user-select: none;
  .tips--list {
    padding: 0 16px;
    margin: 0px;
    li {
      padding: 0px;
      margin: 0px;
      color: #969799;
      font-size: 14px;
      line-height: 24px;
    }
  }
}
</style>

<template>
  <div class="tips">
    <van-divider dashed>{{ title }}</van-divider>
    <ul class="tips--list">
      <li v-for="(tip, tipIndex) of value" :key="tipIndex">
        {{ tipIndex + 1 }}. {{ tip }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'tips',
  props: {
    title: {
      type: String,
      default: '提示',
      required: false
    },
    value: {
      type: Array,
      default: () => [],
      required: false
    }
  }
}
</script>
