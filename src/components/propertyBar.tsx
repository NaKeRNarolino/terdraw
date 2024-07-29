import { useEffect, useState } from "react";
import {
  DrawToolProperties,
  EraserToolProperties,
  Limit,
  Property,
  PropertyType,
  ToolEvents,
  ToolRepository,
  ToolTypes,
} from "../tools/mod";
import { Container } from "./utility";
import { fs, invoke } from "@tauri-apps/api";
import { Dialog } from "../utils";
import { Button } from "./button";
import { BaseDirectory } from "@tauri-apps/api/fs";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { UserProps } from "../user/singleton";
import { builtInMaterials } from "../user/materials";

const PropertyList: Record<ToolTypes, Property[]> = {
  [ToolTypes.Draw]: DrawToolProperties,
  [ToolTypes.Eraser]: EraserToolProperties,
  [ToolTypes.WorldProperties]: [],
};

export const PropertyBar = () => {
  const [tool, setTool] = useState(ToolRepository.getCurrentTool());
  const toolProperties = PropertyList[tool];

  ToolEvents.toolChange.listen(({ second }) => {
    setTool(second);
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Container className="overlay-color horizontal-flex only-horizontal-padding margin-left-025 rounded-025">
        {toolProperties.map((property) => {
          if (property.type == PropertyType.Numeric) {
            return <NumericProperty property={property} />;
          } else if (property.type == PropertyType.ImageProperty) {
            return <ImageProperty property={property} />;
          } else {
            return <MaterialProperty property={property} />;
          }
        })}
      </Container>
    </QueryClientProvider>
  );
};

const NumericProperty = ({ property }: { property: Property }) => {
  const [value, setValue] = useState(property.default);

  UserProps.I.properties[property.id] = value;

  return (
    <Container className="horizontal-flex property-container center-contents only-horizontal-padding">
      <p>{property.name}</p>
      <input
        type="number"
        value={value}
        onChange={(val) => {
          setValue(val.target.value);

          UserProps.I.properties[property.id] = value;
        }}
        className="margin-left-025"
        min={
          (property.additionalProperties?.limit as Limit | undefined)?.min as
            | number
            | undefined
        }
        max={
          (property.additionalProperties?.limit as Limit | undefined)?.max as
            | number
            | undefined
        }
      />
    </Container>
  );
};

const queryClient = new QueryClient();

const ImageProperty = ({ property }: { property: Property }) => {
  const [value, setValue] = useState(property.default);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  UserProps.I.properties[property.id] = value;

  const path = property.additionalProperties.path as string;

  const { data, isPending, error } = useQuery({
    queryKey: ["image", path],
    queryFn: async () => {
      const result = (await invoke("read_images", { path: path })) as string[];
      return result;
    },
    staleTime: 0,
    refetchInterval: 0,
  });

  const getContent = (onClose: () => void) => {
    if (isPending) return "Loading...";
    if (error) return "Error: " + error.message;
    return (
      <div className="image-grid">
        {data.map((imagePath) => (
          <Button
            onClick={() => {
              setValue(imagePath);
              UserProps.I.properties[property.id] = value;
              onClose();
            }}
          >
            <img src={imagePath} className="property-view-img"></img>
            <p>{imagePath.split("\\")[1].split(".")[0]}</p>
          </Button>
        ))}
      </div>
    );
  };

  return (
    <>
      <Container className="horizontal-flex property-container center-contents only-horizontal-padding">
        <p>{property.name}</p>
        <Button
          onClick={() => {
            setIsDialogOpen(true);
          }}
          className="margin-left-025"
        >
          <img src={value as string} className="property-img"></img>
        </Button>
      </Container>
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
        }}
        title="Select Brush"
      >
        <div className="dialog-content">
          {getContent(() => {
            setIsDialogOpen(false);
          })}
        </div>
      </Dialog>
    </>
  );
};

const MaterialProperty = ({ property }: { property: Property }) => {
  const [value, setValue] = useState(property.default);

  UserProps.I.properties[property.id] = value;

  const getContent = () => {
    return (
      <div className="horizontal-flex">
        {builtInMaterials.map((mat) => (
          <Button
            onClick={() => {
              setValue(mat.color);
              UserProps.I.properties[property.id] = value;
            }}
            className="property-btn margin-left-025"
          >
            <div
              style={{
                width: "1rem",
                height: "1rem",
                backgroundColor: mat.color,
                margin: "0!important",
                padding: "0",
              }}
            ></div>
          </Button>
        ))}
      </div>
    );
  };

  return (
    <>
      <Container className="horizontal-flex property-container center-contents only-horizontal-padding">
        <p>{property.name}</p>
        {getContent()}
      </Container>
    </>
  );
};
