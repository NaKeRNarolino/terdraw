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
    this.instance!.currentTool = tool;
  }

  public static getCurrentTool(): ToolTypes {
    return this.instance!.currentTool;
  }
}
