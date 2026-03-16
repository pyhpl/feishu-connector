<template>
  <gj-form-item
    :field="filter.filterField"
    :show-colon="false"
    :rules="[{ required: filter.required, message: filter.requiredTip }]"
  >
    <template #label>
      <gb-help v-if="filter.filterLabelTip" :explain="filter.filterLabelTip">{{
        filter.filterLabel
      }}</gb-help>
      <template v-else>{{ filter.filterLabel }}</template>
    </template>
    <gb-multi-select
      v-if="props.filter.multiple"
      v-model="configStore.filters[props.filter.filterField]"
      :placeholder="props.filter.placeholder || '请选择'"
      :options="props.filter.filterOptions"
      exclude-check
      style="width: 250px"
    />
    <gj-select
      v-model="configStore.filters[props.filter.filterField]"
      :placeholder="props.filter.placeholder || '请选择'"
      allow-clear
      allow-search
      :options="props.filter.filterOptions"
      style="width: 250px"
    >
    </gj-select>
  </gj-form-item>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useConfigStore } from "../../store";
import { isEmpty, isNil } from "lodash-es";

const props = defineProps<{
  filter: any;
}>();

const configStore = useConfigStore();

watch(
  () => props.filter.filterOptions,
  (options) => {
    if (
      props.filter.multiple &&
      !isEmpty(configStore.filters[props.filter.filterField])
    ) {
      return;
    }

    if (
      !props.filter.multiple &&
      !isNil(configStore.filters[props.filter.filterField])
    ) {
      return;
    }

    const selectValues = options
      .filter((item) => item.defaultSelected)
      .map((item) => item.value);

    if (!isEmpty(selectValues)) {
      if (props.filter.multiple) {
        configStore.filters[props.filter.filterField] = selectValues;
      } else {
        configStore.filters[props.filter.filterField] = selectValues[0];
      }
    }
  },
  { immediate: true },
);
</script>
