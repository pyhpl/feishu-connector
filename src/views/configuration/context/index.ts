import { InjectionKey } from "vue";

export interface Validator {
  // 验证器ID
  id: string;
  validate: () => Promise<void | string>;
}

export interface ValidatorContainer {
  validators: Validator[];
  add: (validator: Validator) => void;
  remove: (validator: Validator) => void;
}

export const ValidatorContainerKey: InjectionKey<ValidatorContainer> =
  Symbol("ValidatorContainer");
