import { useEffect, useRef, useState } from "react";
import { Button } from "./button";
import { invoke } from "@tauri-apps/api";
import { DrawTool, ToolTypes, ToolRepository, EraserTool } from "../tools/mod";
import { DisplayCanvas } from "./displayCanvas";
import { UserProps } from "../user/singleton";
import { Container } from "./utility";
import { CanvasLayer } from "../layer/models";

export const Canvas = ({ _selectedLayer }: { _selectedLayer: CanvasLayer }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [URLPATH, setURLPATH] = useState("/");
  const [selectedLayer, setSelectedLayer] = useState(CanvasLayer.Heightmap);
  const [heightmapLayer, setHeightmapLayer] = useState<HTMLImageElement | null>(
    null
  );
  const [materialLayer, setMaterialLayer] = useState<HTMLImageElement | null>(
    null
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      setContext(ctx);
      ctx!.fillStyle = "#000000";
      ctx?.fillRect(0, 0, canvas.width, canvas.height);
      const img = new Image();
      img.src = canvas.toDataURL();
      setHeightmapLayer(img);
      setMaterialLayer(img);
    }
  }, []);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = event.nativeEvent;

    if (context) {
      context.beginPath();
      context.moveTo(offsetX, offsetY);
    }
    setIsDrawing(true);
    UserProps.I.isDrawing = true;
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context) {
      return;
    }
    setURLPATH(ToolRepository.getCurrentTool().toString());
    const { offsetX, offsetY } = event.nativeEvent;

    UserProps.I.drawingOffset = { x: offsetX, y: offsetY };
    switch (ToolRepository.getCurrentTool()) {
      case ToolTypes.Draw: {
        DrawTool(event, context);
        break;
      }
      case ToolTypes.Eraser: {
        EraserTool(event, context);
        break;
      }
    }

    const img = new Image();
    img.src = context.canvas.toDataURL();
    if (selectedLayer == CanvasLayer.Heightmap) {
      setHeightmapLayer(img);
    } else if (selectedLayer == CanvasLayer.Material) {
      setMaterialLayer(img);
    }
  };

  const stopDrawing = () => {
    if (context) {
      context.closePath();
    }
    setIsDrawing(false);
    UserProps.I.isDrawing = false;
  };

  const saveImage = () => {
    const url = canvasRef!.current!.toDataURL("image/png");
    setURLPATH(url);
    invoke("export", { image: url });
  };

  const switchLayer = () => {
    const layer =
      selectedLayer == CanvasLayer.Heightmap
        ? CanvasLayer.Material
        : CanvasLayer.Heightmap;
    setSelectedLayer(layer);
    context?.drawImage(
      layer == CanvasLayer.Material ? materialLayer! : heightmapLayer!,
      0,
      0
    );
  };

  return (
    <Container
      className="horizontal-flex overlay-color rounded-025"
      id="canvas-container"
    >
      <canvas
        ref={canvasRef}
        height={"512"}
        width={"512"}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        onMouseLeave={stopDrawing}
      ></canvas>
      <DisplayCanvas
        heightmap={heightmapLayer!}
        material={materialLayer!}
      ></DisplayCanvas>
      <Button
        onClick={() => {
          switchLayer();
        }}
      >
        <p>switch</p>
      </Button>
    </Container>
  );
};
