import { IdifiedEventNotifier } from "../utils";

export * from "./singleton";

export class UserEvents {
  static exportEvent = new IdifiedEventNotifier<void>();
}
