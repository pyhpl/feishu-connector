<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-content`">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
const prefixCls = "a72ad302";
</script>

<style lang="scss" scoped>
.a72ad302 {
  height: 100vh;
  width: 100vw;
  background-color: #f3f3f3;

  &-content {
    margin: auto;
    // 飞书支持的最大宽高
    width: 792px;
    height: 606px;
    background-color: #fff;
    border: 1px solid #e5e6eb;
    box-sizing: border-box;
  }
}
</style>
