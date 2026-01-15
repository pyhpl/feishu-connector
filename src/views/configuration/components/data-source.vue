<template>
  <div :class="prefixCls">
    <div
      v-for="item in configStore.dataSourceList"
      :key="item.code"
      :class="[
        `${prefixCls}-item`,
        {
          [`${prefixCls}-item-active`]:
            configStore.dataSourceCode === item.code,
        },
      ]"
      @click="onClick(item.code)"
    >
      <div :class="`${prefixCls}-item-content`">
        <div :class="`${prefixCls}-title`">
          <IconDatabaseOutlined class="icon-database" />
          <gb-text>{{ item.name }}</gb-text>
        </div>
        <div :class="`${prefixCls}-desc`">
          <gb-text>{{ item.description }}</gb-text>
        </div>
      </div>
      <div v-if="configStore.dataSourceCode === item.code">
        <IconCheckOutlined class="icon-check" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconCheckOutlined from "@/components/icons/icon-check-outlined.vue";
import IconDatabaseOutlined from "@/components/icons/icon-database-outlined.vue";
import { useConfigStore } from "../store";

const props = defineProps<{
  title: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const prefixCls = "e1207be3";

const configStore = useConfigStore();

const onClick = (code: string) => {
  configStore.setDataSourceCode(code);
  configStore.startDate = "";
  configStore.endDate = "";
};
</script>

<style lang="scss" scoped>
.e1207be3 {
  display: flex;
  flex-direction: column;
  gap: 8px;

  &-item {
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    border: 1px solid var(--line-border-component);
    border-radius: 8px;
    cursor: pointer;

    &:hover {
      background-color: var(--bg-float-overlay);
    }

    &-active {
      border-color: var(--primary);
    }

    &-content {
      font-size: 14px;
      line-height: 22px;
    }

    .icon-check {
      color: var(--primary);
      font-size: 16px;
      min-width: 16px;
    }
  }

  &-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
    color: var(--text-title);

    .icon-database {
      font-size: 16px;
      min-width: 16px;
    }
  }

  &-desc {
    margin-top: 4px;
    color: var(--text-description);
  }
}
</style>
