<template>
  <gb-modal title="重命名" size="auto" :width="450">
    <div :class="prefixCls">
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
        </gj-form>
      </div>
    </div>
    <template #footer>
      <gj-space>
        <gj-button type="plain" @click="destroy">取消</gj-button>
        <gj-button type="primary" :loading="oking" @click="ok">确认</gj-button>
      </gj-space>
    </template>
  </gb-modal>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { GjMessage } from "@gj/atom";
import { useModal } from "@gj/biz";
import { changeUsername } from "@/api/configuration";
import { useConfigStore } from "../../store";

const { destroy } = useModal();

const prefixCls = "b89a1ebd";
const configStore = useConfigStore();

const oking = ref(false);

const formRef = ref();
const form = ref({
  username: configStore.username,
});

const ok = () => {
  formRef.value.validate(async (error) => {
    if (!error) {
      oking.value = true;

      try {
        const res = await changeUsername({
          baseUserId: configStore.userId,
          baseUserName: form.value.username,
        });

        if (res.code === 0) {
          configStore.username = form.value.username;
          GjMessage.success("修改成功");
          destroy();
        } else {
          GjMessage.error(res.message?.zh || "修改失败");
        }
      } finally {
        oking.value = false;
      }
    }
  });
};
</script>

<style lang="scss" scoped>
.b89a1ebd {
}
</style>
