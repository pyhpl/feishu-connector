import { store } from "@/store";
import { UserStore } from "./model";
import { defineStore } from "pinia";
import { User } from "@/model/user";

const USER_KEY = "user";

export const useUserStore = defineStore({
  id: "user",
  state: (): UserStore => ({
    user: null,
  }),
  actions: {
    reset() {
      this.setUser(null);
    },
    /**
     * 设置当前用户信息
     */
    setUser(user: User | null) {
      if (!user) {
        user = null;
        return;
      }

      this.user = user;
    },
  },
});

// 在setup外调用
export const useUserStoreOutside = () => {
  return useUserStore(store);
};
