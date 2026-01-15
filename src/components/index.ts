import { App } from "vue";
import GjAtom from "@gj/atom";
import GjBiz from "@gj/biz";
import ScrollView from "./scroll-view/scroll-view.vue";
import ScrollViewItem from "./scroll-view/scroll-view-item.vue";
import "@gj/atom/theme-chalk/index.css";
import "@gj/biz/theme-chalk/index.css";

export function setupComponents(app: App) {
  app.use(GjAtom);
  app.use(GjBiz);
  app.component(ScrollView.name, ScrollView);
  app.component(ScrollViewItem.name, ScrollViewItem);
}
