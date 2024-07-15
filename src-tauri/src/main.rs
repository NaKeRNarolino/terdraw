// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{
    fs::File,
    io::Write,
    path::{self, Path, PathBuf},
};

#[tauri::command]
fn export(image: &str) {
    let base64_data = image.trim_start_matches("data:image/png;base64,");

    match base64::decode(base64_data) {
        Ok(image_data) => {
            let pathres = tauri::api::dialog::FileDialogBuilder::new()
                .set_directory("/")
                .pick_folder(move |path| {
                    let file_path = format!("{}/heightmap.png", path.unwrap().to_string_lossy());
                    let mut file = File::create(file_path).map_err(|e| e.to_string()).unwrap();
                    file.write_all(&image_data).map_err(|e| e.to_string());
                    println!("folder");
                });
        }
        Err(e) => (),
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![export])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
