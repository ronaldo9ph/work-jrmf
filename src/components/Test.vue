<template>
<div>
  <ul>
     <li v-for="(value, index) in girls">
          {{ index }} - {{ value.name }} - {{ value.age }}
          <a href="javascript:void(0)" @click="notice(value.name,value.age)">发消息</a>
      </li>
  </ul>
  <div>接收来自大群的消息:{{ noticeGirl }}</div>
</div>
</template>
<script>
export default {
  props: {
    girls: {
      type: Array,
      required: true
    },
    noticeGirl: {
      type: String,
      required: false
    }
  },
  methods: {
    notice: function (a, b) {
      this.$emit('introduce', {
        name: a,
        age: b
      })
    }
  }
}

</script>
