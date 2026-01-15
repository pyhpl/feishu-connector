import { defineStore } from "pinia";
import {
  getConfiguration,
  getDataModule,
  getUserId,
} from "@/api/configuration";

export const useConfigStore = defineStore({
  id: "configuration",
  state: () => ({
    loading: false,
    userId: null,
    username: null,
    maxPageSize: null,
    dataSourceCode: "",
    dataSourceList: [],
    startDate: "",
    endDate: "",
  }),
  actions: {
    async init() {
      // 数据模块
      const $1 = async () => {
        const res = await getDataModule();

        this.dataSourceList = res.data;
      };

      // 配置
      const $2 = async () => {
        const res = await getConfiguration();

        this.userId = res.baseUserId;
        this.username = res.baseUserName;
        this.maxPageSize = 100;
        this.dataSourceCode = res.moduleCode;
        this.startDate = res.startDate;
        this.endDate = res.endDate;
      };

      // userId
      const $3 = async () => {
        this.userId = await getUserId();
      };

      Promise.all([$1(), $2(), $3()]).then(() => {
        if (!this.dataSourceCode) {
          this.dataSourceCode = this.dataSourceList[0].code;
        }
      });
    },
    setDataSourceCode(code: string) {
      this.dataSourceCode = code;
    },
  },
});
