// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{
    fmt::format,
    fs::{self, File},
    io::Write,
    path::{self, Path, PathBuf},
};

use image::generate_jsons;

pub mod image;

#[tauri::command]
fn export(material: &str, heightmap: &str, material_dictionary: &str) {
    let base64_data_material = material.trim_start_matches("data:image/png;base64,");
    let hmcopy = heightmap.to_owned();
    let mdcopy = material_dictionary.to_owned();

    println!("{}", hmcopy.clone());
    match base64::decode(base64_data_material) {
        Ok(image_data) => {
            let _pathres = tauri::api::dialog::FileDialogBuilder::new()
                .set_directory("/")
                .pick_folder(move |path| {
                    let file_path =
                        format!("{}/material.png", path.clone().unwrap().to_string_lossy());
                    let mut file = File::create(file_path).map_err(|e| e.to_string()).unwrap();
                    file.write_all(&image_data).map_err(|e| e.to_string());

                    let base64_data_heightmap = hmcopy.trim_start_matches("data:image/png;base64,");
                    match base64::decode(base64_data_heightmap) {
                        Ok(image_data) => {
                            let file_path = format!(
                                "{}/heightmap.png",
                                path.clone().unwrap().to_string_lossy()
                            );
                            let mut file =
                                File::create(file_path).map_err(|e| e.to_string()).unwrap();
                            file.write_all(&image_data).map_err(|e| e.to_string());
                            generate_jsons(
                                format!("{}/material.png", path.clone().unwrap().to_string_lossy())
                                    .as_str()
                                    .into(),
                                format!(
                                    "{}/heightmap.png",
                                    path.clone().unwrap().to_string_lossy()
                                )
                                .as_str()
                                .into(),
                                mdcopy.as_str(),
                                path,
                            )
                        }
                        Err(_) => (),
                    }
                });
        }
        Err(_) => (),
    }
}

#[tauri::command]
async fn read_images(path: &str) -> Result<Vec<String>, String> {
    let mut files: Vec<String> = vec![];

    for dir_entry in fs::read_dir(format!("../public/{path}")).unwrap() {
        let entry_final = dir_entry.unwrap();
        files.push(
            entry_final
                .path()
                .to_str()
                .to_owned()
                .unwrap_or("")
                .to_string(),
        );
    }

    Ok(files)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![export, read_images])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
