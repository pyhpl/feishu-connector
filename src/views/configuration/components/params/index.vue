<template>
  <!-- <div>{{ configStore.filters }}</div> -->
  <gj-form
    ref="formRef"
    layout="vertical"
    :class="prefixCls"
    :model="configStore.filters"
  >
    <template
      v-for="(filter, index) in filterList"
      :key="`${configStore.dataSourceCode}_${index}`"
    >
      <RangePicker
        v-if="filter.filterType === 'range-picker'"
        :filter="filter"
      />
      <Select v-if="filter.filterType === 'select'" :filter="filter" />
    </template>
  </gj-form>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref } from "vue";
import { useConfigStore } from "../../store";
import { ValidatorContainerKey } from "../../context";
import RangePicker from "./range-picker.vue";
import Select from "./select.vue";

const props = defineProps<{
  title: string;
}>();

const prefixCls = "e3416f12";
const formRef = ref();
const configStore = useConfigStore();

const filterList = computed(() => {
  return configStore.filterList.filter((item) => item.filterType !== "hidden");
});

/**
 * 验证
 */

// 全局验证器
const validatorContainer = inject(ValidatorContainerKey);

const validate = () => {
  return new Promise<void | string>((resolve) => {
    formRef.value.validate((error) => {
      resolve(error);
    });
  });
};

const validator = {
  id: props.title,
  validate,
};

onMounted(() => {
  validatorContainer.add(validator);
});

onUnmounted(() => {
  validatorContainer.remove(validator);
});
</script>

<style lang="scss" scoped>
.e3416f12 {
}
</style>
