<template lang="html">
  <div class="v-toast">
    <div class="weui-mask_transparent" v-show="isShowMask && show"></div>
    <transition :name="transition">
      <div class="weui-toast" :style="{width: width}" :class="toastClass" v-show="show">
        <i class="weui-icon-success-no-circle weui-icon_toast" v-show="type !== 'text'"></i>
        <p class="weui-toast__content" v-if="text" :style="style" v-html="$t(text)"></p>
        <p class="weui-toast__content" v-else><slot></slot></p>
      </div>
    </transition>
  </div>
</template>
