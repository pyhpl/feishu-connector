import { InjectionKey } from "vue";

export interface ScrollViewItem {
  index: number;
  title: string;
  isIntersecting: boolean;
  scrollTop: () => void;
}

export interface ScrollViewContext {
  addItem: (item: ScrollViewItem) => void;
  removeItem: (item: ScrollViewItem) => void;
}

export const ScrollViewInjectionKey: InjectionKey<ScrollViewContext> =
  Symbol("ScrollViewContext");
