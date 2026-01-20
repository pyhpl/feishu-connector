import type { App } from "vue";
import { createPinia } from "pinia";

export const store = createPinia();

/**
 * 初始化store
 * 传入app，方便之后扩展
 * @param app
 */
export async function setupStore(app: App) {
  app.use(store);
}

export { useUserStoreOutside } from "./modules/user";
