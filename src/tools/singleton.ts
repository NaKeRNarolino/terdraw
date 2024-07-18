import { ToolEvents } from "./mod";
import { ToolTypes } from "./models";

export class ToolRepository {
  private currentTool: ToolTypes = ToolTypes.WorldProperties;
  private static instance?: ToolRepository;

  constructor() {
    if (ToolRepository.instance) {
      throw new Error("Singleton can be only created once.");
    }
    ToolRepository.instance = this;
  }

  static get I(): ToolRepository {
    if (!ToolRepository.instance) {
      ToolRepository.instance = new ToolRepository();
    }
    return ToolRepository.instance;
  }

  public static setCurrentTool(tool: ToolTypes): void {
    ToolEvents.toolChange.fire({
      first: this.instance!.currentTool,
      second: tool,
    });
    this.instance!.currentTool = tool;
  }

  public static getCurrentTool(): ToolTypes {
    return this.instance!.currentTool;
  }
}
