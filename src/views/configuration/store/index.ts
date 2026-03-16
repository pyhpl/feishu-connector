import { defineStore } from "pinia";
import {
  getConfiguration,
  getDataModule,
  getUserId,
  getUserInfo,
} from "@/api/configuration";
import { isEmpty } from "lodash-es";

type Config = {
  loading: boolean;
  userId: string;
  username: string;
  maxPageSize: number;
  dataSourceCode: string;
  dataSourceList: any[];
  filterDataSourceCodeList: string[];
  filters: Record<string, any>;
};

export const useConfigStore = defineStore({
  id: "configuration",
  state: (): Config => ({
    loading: false,
    userId: null,
    username: null,
    maxPageSize: null,
    dataSourceCode: "",
    dataSourceList: [],
    filterDataSourceCodeList: [],
    filters: {},
  }),
  getters: {
    filterList: (state) => {
      return (
        state.dataSourceList.find((item) => item.code === state.dataSourceCode)
          ?.filterList || []
      );
    },
    filterDataSourceList: (state) => {
      if (isEmpty(state.filterDataSourceCodeList)) {
        return state.dataSourceList;
      }

      return state.dataSourceList.filter((item) =>
        state.filterDataSourceCodeList.includes(item.code),
      );
    },
  },
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
        this.filters = res.filters || {};

        if (!this.username) {
          const userId = await getUserId();

          const res = await getUserInfo({
            baseUserId: userId,
          });

          this.username = res.data.baseUserName;
        }
      };

      // userId
      const $3 = async () => {
        this.userId = await getUserId();
      };

      this.loading = true;

      Promise.all([$1(), $2(), $3()])
        .then(() => {
          if (!this.dataSourceCode) {
            this.dataSourceCode = this.dataSourceList[0].code;
          }
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    setDataSourceCode(code: string) {
      this.dataSourceCode = code;
    },
  },
});
