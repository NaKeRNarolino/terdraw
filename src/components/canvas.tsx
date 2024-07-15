import colorsea from "colorsea";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Button } from "./button";
import { invoke } from "@tauri-apps/api";

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [color, setColor] = useState<string>("#ffffff");
  const [URLPATH, setURLPATH] = useState("/");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      setContext(ctx);
      ctx!.fillStyle = "#000000";
      ctx?.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = event.nativeEvent;
    if (context) {
      context.beginPath();
      context.moveTo(offsetX, offsetY);
    }
    setIsDrawing(true);
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context) {
      return;
    }
    const { offsetX, offsetY } = event.nativeEvent;
    const lineWidth = 60;

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
  };

  const stopDrawing = () => {
    if (context) {
      context.closePath();
    }
    setIsDrawing(false);
  };

  const saveImage = () => {
    const url = canvasRef!.current!.toDataURL("image/png");
    setURLPATH(url);
    invoke("export", { image: url });
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        height={"512"}
        width={"512"}
        style={{ border: "1px solid black" }}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        onMouseLeave={stopDrawing}
      ></canvas>
      <Button onClick={saveImage}>
        <p>Save</p>
      </Button>
      <p>{URLPATH}</p>
    </>
  );
};
