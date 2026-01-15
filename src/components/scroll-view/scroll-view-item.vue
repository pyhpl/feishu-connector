<template>
  <div
    ref="scrollViewItemRef"
    :data-scroll-view-title="title"
    :class="prefixCls"
  >
    <div :class="`${prefixCls}-title`">{{ title }}</div>
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: "ScrollViewItem",
};
</script>

<script setup lang="ts">
import { inject, onMounted, onUnmounted, reactive, ref } from "vue";
import { ScrollViewInjectionKey, ScrollViewItem } from "./context";
import { useIntersectionObserver, templateRef } from "@vueuse/core";

const props = defineProps<{
  index: number;
  title: string;
}>();

const prefixCls = "A9D35504";
const scrollViewItemRef = ref<HTMLDivElement>();
const scrollViewContext = inject(ScrollViewInjectionKey);

const scrollViewItem: ScrollViewItem = reactive({
  index: props.index,
  title: props.title,
  isIntersecting: false,
  scrollTop: () => {
    scrollViewItemRef.value?.scrollIntoView?.({
      block: "start",
      behavior: "smooth",
    });
  },
});

const { stop } = useIntersectionObserver(scrollViewItemRef, ([entry]) => {
  scrollViewItem.isIntersecting = entry?.isIntersecting || false;
});

onMounted(() => {
  scrollViewContext.addItem(scrollViewItem);
});

onUnmounted(() => {
  scrollViewContext.removeItem(scrollViewItem);
  stop();
});
</script>

<style lang="scss" scoped>
.A9D35504 {
  &-title {
    padding-top: 24px;
    margin-bottom: 16px;
    line-height: 24px;
    font-size: 16px;
    font-weight: 500;
    color: var(--text-title);
  }
}
</style>
