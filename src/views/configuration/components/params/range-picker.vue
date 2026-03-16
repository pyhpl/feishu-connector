<template>
  <gj-form-item
    :field="filter.startDateField"
    :show-colon="false"
    :rules="[{ required: filter.required, message: filter.requiredTip }]"
  >
    <template #label>
      <gb-help v-if="filter.filterLabelTip" :explain="filter.filterLabelTip">{{
        filter.filterLabel
      }}</gb-help>
      <template v-else>{{ filter.filterLabel }}</template>
    </template>
    <gj-range-picker
      :model-value="modelValue"
      :disabled-date="disabledDate"
      :placeholder="[filter.startDatePlaceholder, filter.endDatePlaceholder]"
      :showTime="showTime"
      :format="props.filter.format"
      style="width: 250px; padding-top: 7px"
      @change="valueChange"
      @select="onSelect"
      @popupVisibleChange="onPopupVisibleChange"
    />
  </gj-form-item>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useConfigStore } from "../../store";
import { isEmpty } from "lodash-es";

const props = defineProps<{
  filter: any;
}>();

const configStore = useConfigStore();

const dates = ref([]);

const modelValue = computed(() => {
  if (
    !configStore.filters[props.filter?.startDateField] ||
    !configStore.filters[props.filter?.endDateField]
  ) {
    return [];
  }

  return [
    configStore.filters[props.filter.startDateField],
    configStore.filters[props.filter.endDateField],
  ];
});

const valueChange = (value: string[]) => {
  if (!isEmpty(value)) {
    configStore.filters[props.filter.startDateField] = value[0];
    configStore.filters[props.filter.endDateField] = value[1];
  } else {
    configStore.filters[props.filter.startDateField] = "";
    configStore.filters[props.filter.endDateField] = "";
  }
};

const showTime = computed(() => {
  return props.filter.format.includes("HH:mm:ss");
});

const onSelect = (_, value: any[]) => {
  dates.value = value;
};

const onPopupVisibleChange = (visible: boolean) => {
  if (!visible) {
    dates.value = [];
  }
};

const disabledDate = (current: any) => {
  if (!props.filter.dateRangeLimit) {
    return false;
  }

  if (dates.value && dates.value.length) {
    const tooLate =
      dates.value[0] &&
      Math.abs(
        (new Date(current).getTime() - dates.value[0]) / (24 * 60 * 60 * 1000),
      ) >= props.filter.dateRangeLimit;

    const tooEarly =
      dates.value[1] &&
      Math.abs(
        (new Date(current).getTime() - dates.value[1]) / (24 * 60 * 60 * 1000),
      ) >= props.filter.dateRangeLimit;

    return tooEarly || tooLate;
  }

  return false;
};
</script>
