import { Vector2 } from "../utils";

export class UserProps {
  private static instance?: UserProps;
  isDrawing: boolean = false;
  drawingOffset: Vector2 = { x: 0, y: 0 };
  properties: Record<string, number | string> = {};

  constructor() {
    if (UserProps.instance) {
      throw new Error("Singleton can be only created once.");
    }
    UserProps.instance = this;
  }

  static get I(): UserProps {
    if (!UserProps.instance) {
      UserProps.instance = new UserProps();
    }
    return UserProps.instance;
  }
}
