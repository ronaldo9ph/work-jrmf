<template>
  <div id="app">
    <loading v-model="isLoading"></loading>
    <transition name="fade" mode="out-in">
       <keep-alive>
         <router-view v-if="$route.meta.keepAlive"></router-view>
       </keep-alive>
     </transition>
     <transition name="fade" mode="out-in">
       <router-view v-if="!$route.meta.keepAlive"></router-view>
     </transition>
  </div>
</template>

<script>
import { Loading } from 'vux'
import { mapState } from 'vuex'
export default {
  name: 'app',
  components: {
    Loading
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading
    })
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import './styles/frame-openapi.less';
</style>
