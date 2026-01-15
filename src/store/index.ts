import type { App } from 'vue';
import { createPinia } from 'pinia';
import { useUserStoreOutside } from './modules/user';

export const store = createPinia();

/**
 * 初始化store
 * 传入app，方便之后扩展
 * @param app
 */
export async function setupStore(app: App) {
  app.use(store);
  // 初始化用户
  await useUserStoreOutside().init();
}

export { useUserStoreOutside } from './modules/user';