// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;
use window_vibrancy::{apply_blur, apply_vibrancy, NSVisualEffectMaterial};

#[tauri::command]
fn run_executable(path: String) -> Result<(), String> {
    match std::process::Command::new(&path).spawn() {
        Ok(_) => Ok(()),
        Err(err) => Err(format!("{}", err)),
    }
}

#[tauri::command]
async fn download_file(url: String, file_path: String) -> Result<(), String> {
    let response = reqwest::get(url)
        .await
        .map_err(|err| err.to_string())?
        .bytes()
        .await
        .map_err(|err| err.to_string())?;

    std::fs::write(file_path, &response)
        .map_err(|err| err.to_string())?;

    Ok(())
}

fn main() {
  tauri::Builder::default()
    .setup(|app| {
      let window = app.get_window("main").unwrap();

      #[cfg(target_os = "macos")]
      apply_vibrancy(&window, NSVisualEffectMaterial::HudWindow, None, None)
        .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

      #[cfg(target_os = "windows")]
      apply_blur(&window, Some((18, 18, 18, 125)))
        .expect("Unsupported platform! 'apply_blur' is only supported on Windows");

      Ok(())
    })
    .invoke_handler(tauri::generate_handler![run_executable, download_file])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}