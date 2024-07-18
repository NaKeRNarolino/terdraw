import colorsea from "colorsea";
import { UserProps } from "../user/singleton";

export function DrawTool(
  event: React.MouseEvent<HTMLCanvasElement>,
  context: CanvasRenderingContext2D
) {
  const { offsetX, offsetY } = event.nativeEvent;
  const color = "#ffffff";

  // const finalColorRGBA = colorsea(color).rgba();
  // const finalColor = colorsea([
  //   finalColorRGBA[0],
  //   finalColorRGBA[1],
  //   finalColorRGBA[2],
  //   finalColorRGBA[3] - 99,
  // ]).hex();

  context.strokeStyle = color;

  context.lineWidth = UserProps.I.properties["size"] as number;
  context.lineCap = "round";
  context.lineJoin = "round";

  context.beginPath();
  context.globalCompositeOperation = "lighten";
  const img = new Image();

  img.src = UserProps.I.properties["brush"] as string;
  // context.lineTo(offsetX, offsetY);
  context.drawImage(
    img,
    offsetX - context.lineWidth / 2,
    offsetY - context.lineWidth / 2,
    context.lineWidth,
    context.lineWidth
  );
  //context.stroke();
  console.log(img.src, context.lineWidth);
}

export function EraserTool(
  event: React.MouseEvent<HTMLCanvasElement>,
  context: CanvasRenderingContext2D
) {
  const { offsetX, offsetY } = event.nativeEvent;
  const lineWidth = 60;
  const color = "#000000";

  const gradient = context.createRadialGradient(
    offsetX,
    offsetY,
    lineWidth / 2,
    offsetX,
    offsetY,
    0
  );

  context.globalCompositeOperation = "source-over";

  context.strokeStyle = color;

  context.lineTo(offsetX, offsetY);
  context.stroke();
  context.beginPath();
  // context.arc(offsetX, offsetY, lineWidth / 2, 0, Math.PI * 2);
  context.beginPath();
  context.moveTo(offsetX, offsetY);
}
