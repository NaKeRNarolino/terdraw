export interface Material {
  name: string;
  id: string;
  color: string;
}

export const builtInMaterials: Material[] = [
  {
    name: "Grass",
    id: "minecraft:grass",
    color: "#00ff00",
  },
  {
    name: "Stone",
    id: "minecraft:stone",
    color: "#888888",
  },
  {
    name: "Dirt",
    id: "minecraft:dirt",
    color: "#663300",
  },
  {
    name: "Snow",
    id: "minecraft:snow",
    color: "#c9c9c9",
  },
];
