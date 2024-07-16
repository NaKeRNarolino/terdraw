import { Vector2 } from "../utls";

export class UserProps {
  private static instance?: UserProps;
  isDrawing: boolean = false;
  drawingOffset: Vector2 = { x: 0, y: 0 };

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
