<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-content`">
      <slot />
    </div>
    <div :class="`${prefixCls}-timeline`">
      <gj-timeline>
        <gj-timeline-item
          v-for="item in scrollViewItems"
          :key="item.index"
          :class="{
            [`${prefixCls}-timeline-active`]:
              activeScrollViewItem?.index === item.index,
          }"
          @click="handleClickTimeline(item)"
        >
          <gb-text>{{ item.title }}</gb-text>
        </gj-timeline-item>
      </gj-timeline>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "ScrollView",
};
</script>

<script setup lang="ts">
import { computed, provide, reactive } from "vue";
import { ScrollViewInjectionKey, ScrollViewItem } from "./context";

const prefixCls = "FDEA3AF8";

const scrollViewItems = reactive<ScrollViewItem[]>([]);

const activeScrollViewItem = computed(() => {
  return scrollViewItems.find((item) => item.isIntersecting);
});

provide(ScrollViewInjectionKey, {
  addItem: (item) => {
    if (scrollViewItems.every(({ index }) => item.index !== index)) {
      scrollViewItems.push(item);
      scrollViewItems.sort((a, b) => a.index - b.index);
    }
  },
  removeItem: (item) => {
    const index = scrollViewItems.findIndex(
      ({ index }) => item.index === index
    );
    if (index > -1) {
      scrollViewItems.splice(index, 1);
    }
  },
});

const handleClickTimeline = (item: ScrollViewItem) => {
  item.scrollTop();
};
</script>

<style lang="scss" scoped>
.FDEA3AF8 {
  display: flex;
  height: 100%;

  &-content {
    height: 100%;
    flex: 1;
    padding: 0 24px 24px;
    overflow-y: auto;
    box-sizing: border-box;
  }

  &-timeline {
    height: 100%;
    width: 160px;
    min-width: 160px;
    padding: 24px 8px 0px 13px;
    border-left: 1px solid #e5e6eb;
    box-sizing: border-box;
    overflow: auto;

    :deep(.arco-timeline-item) {
      min-height: 36px;
    }

    :deep(.arco-timeline-item-content-wrapper) {
      margin-left: 9px;
    }

    :deep(.arco-timeline-item-dot-solid) {
      background-color: #86909c;
    }

    :deep(.arco-timeline-item-content) {
      color: #4e5969;
      font-size: 12px;
      line-height: 18px;
      padding: 0 4px;
      margin-bottom: 0;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: #e8f3ff;
      }
    }

    &-active {
      :deep(.arco-timeline-item-dot-solid) {
        background-color: #0045f0;
      }

      :deep(.arco-timeline-item-content) {
        color: #0045f0;
      }

      :deep(.arco-timeline-item-content) {
        background-color: #e8f3ff;
      }
    }
  }
}
</style>
