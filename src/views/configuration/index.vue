<template>
  <gj-spin tip="加载中..." :loading="configStore.loading" :class="prefixCls">
    <div ref="contentRef" :class="`${prefixCls}-scroll-view`">
      <scroll-view>
        <scroll-view-item
          v-for="(view, index) in scrollViews"
          :index="index"
          :key="view.title"
          :title="view.title"
          :class="`${prefixCls}-item`"
        >
          <component :is="view.component" :index="index" :title="view.title" />
        </scroll-view-item>
      </scroll-view>
    </div>
    <div :class="`${prefixCls}-footer`">
      <gj-button
        type="primary"
        :disabled="disabled"
        :loading="saveing"
        @click="next"
        >下一步</gj-button
      >
    </div>
  </gj-spin>
</template>

<script setup lang="ts">
import { setConfiguration } from "@/api/configuration";
import Account from "./components/account/index.vue";
import DataSource from "./components/data-source.vue";
import Params from "./components/params/index.vue";
import { useConfigStore } from "./store";
import { computed, provide, ref } from "vue";
import { ValidatorContainer, ValidatorContainerKey } from "./context";

const prefixCls = "f28b3eba";
const configStore = useConfigStore();

const saveing = ref(false);

const contentRef = ref<HTMLElement>();

const needParamsDataSourceCodes = [
  "PRODUCT",
  "DISTRIBUTION",
  "ORDER",
  "PURCHASE_ORDER",
  "FBA_GOODS",
];

const scrollViews = computed(() => {
  const configs: any[] = [
    { title: "账号设置", component: Account },
    { title: "数据源选择", component: DataSource },
  ];

  if (needParamsDataSourceCodes.includes(configStore.dataSourceCode)) {
    configs.push({ title: "参数设置", component: Params });
  }

  return configs;
});

const disabled = computed(() => {
  return (
    !configStore.username ||
    (needParamsDataSourceCodes.includes(configStore.dataSourceCode) &&
      (!configStore.startDate || !configStore.endDate))
  );
});

/**
 * 全局验证器
 */
const validatorContainer: ValidatorContainer = {
  validators: [],
  add(validator) {
    if (this.validators.every((item) => item.id !== validator.id)) {
      this.validators.push(validator);
    }
  },
  remove(validator) {
    const index = this.validators.findIndex((item) => item.id === validator.id);
    if (index > -1) {
      this.validators.splice(index, 1);
    }
  },
};

// 注册全局验证器
provide(ValidatorContainerKey, validatorContainer);

const next = async () => {
  saveing.value = true;

  try {
    const errors = await Promise.all(
      validatorContainer.validators.map(async (validator) => {
        return {
          validator,
          error: await validator.validate(),
        };
      })
    );

    const error = errors.find((item) => item.error);

    if (error) {
      contentRef.value
        ?.querySelector(`[data-scroll-view-title="${error.validator.id}"]`)
        ?.scrollIntoView({
          block: "start",
          behavior: "smooth",
        });

      return;
    }

    await setConfiguration({
      baseUserId: configStore.userId,
      baseUserName: configStore.username,
      moduleCode: configStore.dataSourceCode,
      maxPageSize: configStore.maxPageSize,
      startDate: configStore.startDate,
      endDate: configStore.endDate,
    });
  } finally {
    saveing.value = false;
  }
};

// 初始化
configStore.init();
</script>

<style lang="scss" scoped>
.f28b3eba {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  &-scroll-view {
    flex: 1;
    width: 100%;
    overflow: hidden;
  }

  &-footer {
    padding: 12px 16px;
    text-align: right;
    border-top: 1px solid #e5e6eb;
  }
}
</style>
