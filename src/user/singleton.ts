import { CanvasLayer } from "../layer/models";
import { Vector2 } from "../utils";
import { builtInMaterials, Material } from "./materials";

export class UserProps {
  private static instance?: UserProps;
  isDrawing: boolean = false;
  drawingOffset: Vector2 = { x: 0, y: 0 };
  properties: Record<string, number | string> = {};
  layer: CanvasLayer = CanvasLayer.Heightmap;
  colorMatch: Record<string, string> = {};

  constructor() {
    if (UserProps.instance) {
      throw new Error("Singleton can be only created once.");
    }
    UserProps.instance = this;
    for (let mat of builtInMaterials) {
      this.colorMatch[mat.color] = mat.id;
    }
  }

  static get I(): UserProps {
    if (!UserProps.instance) {
      UserProps.instance = new UserProps();
    }
    return UserProps.instance;
  }

  addNewMaterial(mat: Material) {
    this.colorMatch[mat.color] = mat.id;
  }
}
