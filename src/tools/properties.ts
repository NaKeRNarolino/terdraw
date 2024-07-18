import { path } from "@tauri-apps/api";

export enum PropertyType {
  MaterialProperty,
  Numeric,
  ImageProperty,
}

export interface Limit {
  min: number;
  max: number;
}

export interface Property {
  type: PropertyType;
  name: string;
  additionalProperties: Record<string, number | string | Limit>;
  value?: number | string;
  default: number | string;
  id: string;
}

export const DrawToolProperties: Property[] = [
  {
    id: "brush",
    name: "Brush",
    type: PropertyType.ImageProperty,
    additionalProperties: {
      path: "/brushes",
    },
    default: "/brushes/Circle Mountain 1.png",
  },
  {
    id: "size",
    name: "Size",
    type: PropertyType.Numeric,
    additionalProperties: {
      limit: {
        min: 1,
        max: 1000,
      },
    },
    default: 50,
  },
  {
    id: "intensity",
    name: "Intensity",
    type: PropertyType.Numeric,
    additionalProperties: {
      limit: {
        min: 0,
        max: 100,
      },
    },
    default: 60,
  },
  {
    id: "material",
    name: "Material",
    type: PropertyType.MaterialProperty,
    additionalProperties: {},
    default: "minecraft:grass",
  },
];

export const EraserToolProperties: Property[] = [
  {
    id: "Brush",
    name: "Brush",
    type: PropertyType.ImageProperty,
    additionalProperties: {
      path: "/brushes",
    },
    default: "/brushes/Circle Mountain 1.png",
  },
  {
    id: "size",
    name: "Size",
    type: PropertyType.Numeric,
    additionalProperties: {
      limit: {
        min: 1,
        max: 100,
      },
    },
    default: 50,
  },
  {
    id: "intensity",
    name: "Intensity",
    type: PropertyType.Numeric,
    additionalProperties: {
      limit: {
        min: 0,
        max: 100,
      },
    },
    default: 60,
  },
];
