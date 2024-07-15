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
    if (!ToolRepository.instance) throw new Error("Repository not created.");
    return ToolRepository.instance;
  }

  public setCurrentTool(tool: ToolTypes): void {
    this.currentTool = tool;
  }

  public getCurrentTool(): ToolTypes {
    return this.currentTool;
  }
}
