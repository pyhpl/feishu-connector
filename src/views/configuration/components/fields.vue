<template>
  <gj-spin :class="prefixCls" :loading="loading" tip="加载中...">
    <div :class="`${prefixCls}-tip`">字段范围</div>
    <div :class="`${prefixCls}-card`">
      <div :class="`${prefixCls}-card-header`">
        <gj-checkbox>全选</gj-checkbox>
        <div :class="`${prefixCls}-check-tip`">已选择&nbsp;9&nbsp;项</div>
      </div>
      <gj-checkbox-group :class="`${prefixCls}-card-content`">
        <gj-checkbox value="1" :class="`${prefixCls}-checkbox`"
          >Option 1</gj-checkbox
        >
        <gj-checkbox value="2" :class="`${prefixCls}-checkbox`"
          >Option 2</gj-checkbox
        >
        <gj-checkbox value="3" :class="`${prefixCls}-checkbox`"
          >Option 3</gj-checkbox
        >
      </gj-checkbox-group>
    </div>
  </gj-spin>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useConfigStore } from "../store";
import { getTableMeta } from "@/api/configuration";

const prefixCls = "e1207be3";
const configStore = useConfigStore();

const loading = ref(false);
const list = ref<any[]>([]);

const params = {
  fields: ["id1", "id2", "id3"],
};

watch(
  () => configStore.dataSourceCode,
  async (value) => {
    if (value) {
      loading.value = true;

      try {
        const res = await getTableMeta({ code: value });
        list.value = res.data;
      } finally {
        loading.value = false;
      }
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.e1207be3 {
  line-height: 22px;
  font-size: 14px;

  &-tip {
    color: var(--text-title);
  }

  &-card {
    border: 1px solid var(--line-border-component);
    border-radius: 6px;

    &-header {
      position: sticky;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px 12px 11px;
      border-bottom: 1px solid var(--line-border-component);
      z-index: 2;
    }

    &-content {
      max-height: 352px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: 12px 16px 12px 11px;
      overflow-x: hidden;
      overflow-y: overlay;
    }
  }

  &-checkbox {
    height: 32px;
    width: 100%;
    margin-right: 0;
    border-radius: 4px;

    &:hover {
      background-color: var(--fill-hover);

      :deep(.arco-icon-hover.arco-checkbox-icon-hover::before) {
        background-color: transparent;
      }
    }
  }

  &-check-tip {
    color: var(--text-caption);
  }

  :deep(.arco-checkbox-label) {
    font-size: 14px;
  }

  :deep(.arco-checkbox-icon) {
    width: 16px;
    height: 16px;
  }

  :deep(.arco-icon-hover.arco-checkbox-icon-hover::before) {
    width: 26px;
    height: 26px;
  }

  :deep(.arco-checkbox-checked .arco-checkbox-icon-check) {
    transform: scale(1.4);
  }
}
</style>
