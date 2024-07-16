import colorsea from "colorsea";

export function DrawTool(
  event: React.MouseEvent<HTMLCanvasElement>,
  context: CanvasRenderingContext2D
) {
  const { offsetX, offsetY } = event.nativeEvent;
  const lineWidth = 60;
  const color = "#ffffff";

  const gradient = context.createRadialGradient(
    offsetX,
    offsetY,
    lineWidth / 2,
    offsetX,
    offsetY,
    0
  );

  const finalColorRGBA = colorsea(color).rgba();
  const finalColor = colorsea([
    finalColorRGBA[0],
    finalColorRGBA[1],
    finalColorRGBA[2],
    finalColorRGBA[3] - 99,
  ]).hex();
  gradient.addColorStop(0, `${color}00`);
  gradient.addColorStop(1, finalColor);

  context.fillStyle = gradient;
  context.strokeStyle = gradient;
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.lineJoin = "round";

  context.lineTo(offsetX, offsetY);
  context.stroke();
  context.beginPath();
  // context.arc(offsetX, offsetY, lineWidth / 2, 0, Math.PI * 2);
  context.fill();
  context.beginPath();
  context.moveTo(offsetX, offsetY);
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

  const finalColorRGBA = colorsea(color).rgba();
  const finalColor = colorsea([
    finalColorRGBA[0],
    finalColorRGBA[1],
    finalColorRGBA[2],
    finalColorRGBA[3] - 80,
  ]).hex();
  gradient.addColorStop(0, `${color}00`);
  gradient.addColorStop(1, finalColor);

  context.fillStyle = gradient;
  context.strokeStyle = gradient;
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.lineJoin = "round";

  context.lineTo(offsetX, offsetY);
  context.stroke();
  context.beginPath();
  // context.arc(offsetX, offsetY, lineWidth / 2, 0, Math.PI * 2);
  context.fill();
  context.beginPath();
  context.moveTo(offsetX, offsetY);
}
