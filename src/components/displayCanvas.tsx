import colorsea from "colorsea";
import { Ref, RefObject, useEffect, useRef, useState } from "react";
import { UserProps } from "../user/singleton";

export const DisplayCanvas = ({
  heightmapContext,
}: {
  heightmapContext: CanvasRenderingContext2D;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      setContext(ctx);
      ctx!.fillStyle = "#000000";
      ctx?.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  setTimeout(() => {
    context?.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context!.globalCompositeOperation = "lighten";
    context?.drawImage(heightmapContext.canvas, 0, 0);
    context!.globalCompositeOperation = "source-over";
  }, 100);

  return (
    <>
      <canvas
        ref={canvasRef}
        height={"512"}
        width={"512"}
        id="display-canvas"
      ></canvas>
    </>
  );
};
