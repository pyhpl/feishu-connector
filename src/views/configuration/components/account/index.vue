<template>
  <div
    :class="[prefixCls, { [`${prefixCls}-bind`]: configStore.username }]"
    @click="relate"
  >
    <div :class="`${prefixCls}-content`">
      <div :class="`${prefixCls}-icon-wrap`">
        <IconLogo v-if="configStore.username" class="icon-logo" />
        <IconAddOutlined v-else class="icon-add-outlined" />
      </div>
      <div :class="`${prefixCls}-text`">
        {{ configStore.username || "关联账号" }}
      </div>
    </div>
    <gj-dropdown
      v-if="configStore.username"
      v-model:popup-visible="popupVisible"
      position="br"
      @select="op"
    >
      <div
        class="icon-more-wrap"
        :style="
          popupVisible ? { backgroundColor: '#1f23291a', color: '#2b2f36' } : {}
        "
      >
        <IconMoreOutlined class="icon-more-outlined" />
      </div>
      <template #content>
        <gj-doption value="relate">
          <div :class="`${prefixCls}-doption`">重新关联</div>
        </gj-doption>
        <gj-doption value="rename">
          <div :class="`${prefixCls}-doption`">重命名</div>
        </gj-doption>
      </template>
    </gj-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { GbModal } from "@gj/biz";
import Rename from "./rename.vue";
import RelateAccount from "./relate-account.vue";
import IconAddOutlined from "@/components/icons/icon-add-outlined.vue";
import IconLogo from "@/components/icons/icon-logo.vue";
import IconMoreOutlined from "@/components/icons/icon-more-outlined.vue";
import IconEditOutlined from "@/components/icons/icon-edit-outlined.vue";
import { useConfigStore } from "../../store";

const prefixCls = "ed87acc0";

const configStore = useConfigStore();

const popupVisible = ref(false);

const relate = () => {
  if (configStore.username) {
    return;
  }

  GbModal.create(RelateAccount);
};

const op = (type: "rename" | "relate") => {
  if (type === "rename") {
    GbModal.create(Rename);
  } else if (type === "relate") {
    GbModal.create(RelateAccount);
  }
};
</script>

<style lang="scss" scoped>
$prefixCls: ed87acc0;

.#{$prefixCls} {
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 11px;
  border: 1px solid var(--line-border-component);
  border-radius: 6px;
  box-sizing: border-box;
  cursor: pointer;
  background-color: #fff;

  &:not(&-bind):hover {
    background-color: var(--bg-float-overlay);
  }

  &-content {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &-icon-wrap {
    height: 32px;
    width: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed var(--line-border-component);
    border-radius: 100%;
    color: var(--icon-n2);
    font-size: 14px;
  }

  &-bind {
    .#{$prefixCls}-icon-wrap {
      border-color: transparent;
    }
  }

  .icon-add-outlined {
    font-size: 14px;
  }

  &-text {
    font-size: 14px;
    line-height: 22px;
  }

  .icon-more-wrap {
    height: 24px;
    width: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    color: #646a73;

    &:hover {
      background-color: #1f23291a;
      color: #2b2f36;
    }
  }

  .icon-more-outlined {
    font-size: 16px;
    min-width: 16px;
  }

  &-doption {
    display: flex;
    align-items: center;
    min-width: 94px;
    font-size: 14px;
    color: var(--text-title);

    .icon-edit-outlined {
      margin-right: 8px;
      font-size: 16px;
      color: var(--icon-n2);
    }
  }
}
</style>
