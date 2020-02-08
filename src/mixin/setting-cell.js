import { get } from 'lodash'

export default {
  props: {
    label: {
      type: String,
      default: '',
      required: false
    },
    path: {
      type: String,
      default: '',
      required: false
    }
  },
  created () {
    // 从 store 中加载值
    this.load()
  },
  methods: {
    /**
     * @description 从 store 中加载值
     */
    load () {
      this.currentValue = get(this.$store.getters['SETTING'], this.path, this.currentValue)
    },
    /**
     * @description 控件变化触发
     */
    commit (value) {
      this.$store.commit('SET_SETTING', {
        path: this.path,
        value
      })
    }
  }
}
