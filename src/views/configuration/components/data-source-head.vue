<template>
  <div :class="prefixCls">
    数据源选择
    <gb-multi-select
      v-model="configStore.filterDataSourceCodeList"
      :options="options"
      exclude-check
      placeholder="请选择"
      @change="change"
    >
    </gb-multi-select>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useConfigStore } from "../store";

const prefixCls = "f1237ga3";
const configStore = useConfigStore();

const options = computed(() => {
  return configStore.dataSourceList.map((item) => ({
    label: item.name,
    value: item.code,
  }));
});

const change = (codes: string[]) => {
  if (codes.includes(configStore.dataSourceCode)) {
    return;
  }

  configStore.dataSourceCode = codes[0];
  configStore.filters = {};
};
</script>

<style lang="scss" scoped>
.f1237ga3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
