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
    async initDataModule() {
      const res = await getDataModule(this.username ? this.userId : "");
      this.dataSourceList = res.data;
    },
    async init() {
      // 配置
      const getConfig = async () => {
        const [userId, configRes] = await Promise.all([
          getUserId(),
          getConfiguration(),
        ]);

        this.userId = configRes.baseUserId || userId;
        this.username = configRes.baseUserName;
        this.maxPageSize = 100;
        this.dataSourceCode = configRes.moduleCode;
        this.filters = configRes.filters || {};

        if (!this.username) {
          const res = await getUserInfo({
            baseUserId: this.userId,
          });

          this.username = res.data.baseUserName;
        }
      };

      this.loading = true;

      try {
        await getConfig();
        await this.initDataModule();

        if (!this.dataSourceCode && !isEmpty(this.dataSourceList)) {
          this.dataSourceCode = this.dataSourceList[0].code;
        }
      } finally {
        this.loading = false;
      }
    },
    setDataSourceCode(code: string) {
      this.dataSourceCode = code;
    },
  },
});
