<template>
  <gb-modal title="关联积加ERP账号" size="auto" :width="600">
    <div :class="prefixCls">
      <div :class="`${prefixCls}-logo-wrap`">
        <IconLogo class="icon-logo" />
      </div>
      <div :class="`${prefixCls}-form-wrap`">
        <gj-form ref="formRef" :model="form" layout="vertical">
          <gj-form-item
            field="username"
            :rules="[{ required: true, message: '请输入账号名称' }]"
          >
            <template #label>
              <gb-help explain="请为连接器的关联账号指定一个名称"
                >账号名称</gb-help
              >
            </template>
            <gj-input
              v-model="form.username"
              placeholder="请输入"
              :max-length="100"
              allow-clear
              show-word-limit
            />
          </gj-form-item>
          <gj-form-item
            field="appId"
            :rules="[{ required: true, message: '请输入App ID' }]"
          >
            <template #label>App ID</template>
            <gj-input v-model="form.appId" placeholder="请输入" allow-clear />
          </gj-form-item>
          <gj-form-item
            field="appKey"
            :rules="[{ required: true, message: '请输入App key' }]"
          >
            <template #label>App key</template>
            <gj-input-password
              v-model="form.appKey"
              placeholder="请输入"
              allow-clear
            />
          </gj-form-item>
        </gj-form>
      </div>
    </div>
    <template #footer>
      <gj-space>
        <gj-button type="plain" @click="destroy">取消</gj-button>
        <gj-button :loading="oking" type="primary" @click="ok">确认</gj-button>
      </gj-space>
    </template>
  </gb-modal>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import IconLogo from "@/components/icons/icon-logo.vue";
import { useModal } from "@gj/biz";
import { bindFeishu } from "@/api/configuration";
import { useConfigStore } from "../../store";
import { GjMessage } from "@gj/atom";

const { destroy } = useModal();

const prefixCls = "b89a1ebd";
const configStore = useConfigStore();

const oking = ref(false);

const formRef = ref();
const form = ref({
  username: configStore.username || "我的“积加 ERP”连接器",
  appId: null,
  appKey: null,
});

const ok = () => {
  formRef.value.validate((error) => {
    if (!error) {
      oking.value = true;

      bindFeishu({
        appId: form.value.appId,
        appKey: form.value.appKey,
        baseUserId: configStore.userId,
        baseUserName: form.value.username,
      })
        .then((res) => {
          if (res.code === 0) {
            configStore.username = form.value.username;
            GjMessage.success("关联成功");
            destroy();
          } else {
            GjMessage.error(res.message?.zh || "关联失败");
          }
        })
        .finally(() => {
          oking.value = false;
        });
    }
  });
};
</script>

<style lang="scss" scoped>
.b89a1ebd {
  display: flex;
  flex-direction: column;
  align-items: center;

  &-logo-wrap {
    display: flex;
    margin-bottom: 10px;
    border-radius: 14px;
  }

  &-form-wrap {
    width: 90%;
  }

  .icon-logo {
    height: 56px;
    width: 56px;
  }
}
</style>
