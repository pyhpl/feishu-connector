<template>
  <gj-form
    ref="formRef"
    layout="vertical"
    :class="prefixCls"
    :model="configStore"
  >
    <gj-form-item
      field="startDate"
      :label="label"
      :show-colon="false"
      :rules="[{ required: true, message: '请选择时间范围' }]"
    >
      <gj-range-picker
        :model-value="dateRange"
        @change="valueChange"
        style="padding-top: 7px; width: 250px"
      />
    </gj-form-item>
  </gj-form>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref } from "vue";
import { useConfigStore } from "../../store";
import { isEmpty } from "lodash-es";
import { ValidatorContainerKey } from "../../context";

const props = defineProps<{
  title: string;
}>();

const prefixCls = "e3416f12";
const formRef = ref();
const configStore = useConfigStore();

const label = computed(() => {
  return {
    PRODUCT: "创建时间",
    DISTRIBUTION: "创建时间",
    ORDER: "订购时间",
    PURCHASE_ORDER: "创建时间",
    FBA_GOODS: "创建时间",
  }[configStore.dataSourceCode];
});

const dateRange = computed(() => {
  if (configStore.startDate && configStore.endDate) {
    return [configStore.startDate, configStore.endDate];
  }
  return [];
});

const valueChange = (value: string[]) => {
  if (!isEmpty(value)) {
    configStore.startDate = value[0];
    configStore.endDate = value[1];
  } else {
    configStore.startDate = "";
    configStore.endDate = "";
  }
};

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
