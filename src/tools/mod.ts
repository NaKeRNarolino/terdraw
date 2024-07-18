import { EventNotifier, Pair } from "../utils";
import { ToolTypes } from "./models";

export * from "./singleton";
export * from "./models";
export * from "./handlers";
export * from "./properties";

export class ToolEvents {
  // pair for before/after change event
  static toolChange = new EventNotifier<Pair<ToolTypes, ToolTypes>>();
}
