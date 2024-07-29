use std::{
    any::TypeId,
    fs,
    path::{self, PathBuf},
};

use colors_transform::Color;
use image::{imageops::colorops, GenericImageView, Pixel};
use serde::{Deserialize, Serialize};
use serde_json::{json, Map, Value};

#[derive(Serialize, Deserialize)]
struct Vector2 {
    x: u32,
    y: u32,
}

pub fn generate_jsons(
    path_to_material: PathBuf,
    path_to_heightmap: PathBuf,
    material_dictionary_raw: &str,
    path: Option<PathBuf>,
) {
    let material_image = image::open(path_to_material).unwrap();
    let heightmap_image = image::open(path_to_heightmap).unwrap();

    println!("{}", material_dictionary_raw.clone());
    let material_dictionary: serde_json::map::Map<String, Value> =
        serde_json::from_str(material_dictionary_raw).unwrap();

    let mut material_json: Map<String, Value> = Map::new();
    let mut heightmap_json: Map<String, Value> = Map::new();

    for x in 0..512 {
        for y in 0..512 {
            let pixel = material_image.get_pixel(x, y);
            let color = pixel.to_rgb();
            let r = color[0];
            let g = color[1];
            let b = color[2];
            let color_hex =
                colors_transform::Rgb::from(r.into(), g.into(), b.into()).to_css_hex_string();

            let vpart = Value::String("minecraft:air".to_owned());
            let value_raw = material_dictionary.get(&color_hex).unwrap_or(&vpart);

            material_json.insert(
                serde_json::to_string_pretty(&Vector2 { x, y }).unwrap(),
                value_raw.clone(),
            );

            let pixel_heightmap = heightmap_image.get_pixel(x, y);
            let height_int: f64 = pixel_heightmap.to_rgb()[0].into();
            let height_normalized: f64 = height_int / 255.0;
            let height = height_normalized * 300.0;

            heightmap_json.insert(
                serde_json::to_string_pretty(&Vector2 { x, y }).unwrap(),
                json!(height),
            );
        }
    }

    fs::write(
        format!(
            "{}/material.json",
            path.clone().unwrap().to_str().unwrap_or("")
        ),
        serde_json::to_string_pretty(&material_json).unwrap(),
    );

    fs::write(
        format!(
            "{}/heightmap.json",
            path.clone().unwrap().to_str().unwrap_or("")
        ),
        serde_json::to_string_pretty(&heightmap_json).unwrap(),
    );

    generate_js(
        format!(
            "{}/heightmap.json",
            path.clone().unwrap().to_str().unwrap_or("")
        ),
        format!(
            "{}/material.json",
            path.clone().unwrap().to_str().unwrap_or(""),
        ),
        path.unwrap().to_str().unwrap_or("").to_owned(),
    );
}

pub fn generate_js(heightmap_path: String, material_path: String, path: String) {
    let heightmap_content = fs::read_to_string(heightmap_path).unwrap();
    let material_content = fs::read_to_string(material_path).unwrap();

    let heightmap_js = format!("export const heightmap = {}", heightmap_content);
    let material_js = format!("export const material = {}", material_content);
    fs::write(format!("{}/heightmap.js", path.clone()), heightmap_js).unwrap();
    fs::write(format!("{}/material.js", path.clone()), material_js).unwrap();
}
