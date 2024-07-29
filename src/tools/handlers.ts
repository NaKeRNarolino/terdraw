import colorsea from "colorsea";
import { UserProps } from "../user/singleton";
import { CanvasLayer } from "../layer/models";

export function DrawTool(
  event: React.MouseEvent<HTMLCanvasElement>,
  context: CanvasRenderingContext2D
) {
  const { offsetX, offsetY } = event.nativeEvent;
  let color: string;
  if (UserProps.I.layer == CanvasLayer.Heightmap) {
    color = "#ffffff";

    context.strokeStyle = color;

    context.lineWidth = UserProps.I.properties["size"] as number;
    context.lineCap = "round";
    context.lineJoin = "round";
    const img = new Image();

    img.src = UserProps.I.properties["brush"] as string;

    context.beginPath();

    context.globalAlpha = (UserProps.I.properties["intensity"] as number) / 100;

    context.drawImage(
      img,
      offsetX - context.lineWidth / 2,
      offsetY - context.lineWidth / 2,
      context.lineWidth,
      context.lineWidth
    );
  } else {
    color = UserProps.I.properties["material"] as string;

    context.strokeStyle = color;

    context.lineWidth = UserProps.I.properties["size"] as number;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.globalCompositeOperation = "source-over";
    context.globalAlpha = (UserProps.I.properties["intensity"] as number) / 100;

    context.beginPath();
    context.lineTo(offsetX, offsetY);
    context.stroke();
  }

  // const finalColorRGBA = colorsea(color).rgba();
  // const finalColor = colorsea([
  //   finalColorRGBA[0],
  //   finalColorRGBA[1],
  //   finalColorRGBA[2],
  //   finalColorRGBA[3] - 99,
  // ]).hex();
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
