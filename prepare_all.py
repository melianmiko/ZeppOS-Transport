from pathlib import Path
import json
import shutil
import os

project = Path(".").resolve()
common_assets = project / "assets" / "common"

low_ram_targets = ["band-7", "mi-band-7"]

pages = [
    "HomeScreen",
    "ViewStation",
    "FontSizeSetupScreen",
    "AboutScreen",
    "DonateScreen",
]

module = {
  "app-side": {
    "path": "app-side/index"
  },
  "setting": {
    "path": "setting/index"
  }
}

with open("app.json", "r") as f:
  app_json = json.load(f)


# Prepare assets
for target_id in app_json["targets"]:
  assets_dir = project / "assets" / target_id
  if assets_dir.is_dir():
    shutil.rmtree(assets_dir)
  assets_dir.mkdir()

  # Misc files
  shutil.copy(common_assets / "icon.png", assets_dir / "icon.png")

  # Icons
  if target_id in low_ram_targets:
    icon_size = 24
    shutil.copy(common_assets / "qr_small.png", assets_dir / "donate.png")
    shutil.copy(common_assets / "spinner.png", assets_dir / "spinner.png")
  else:
    icon_size = 32
    shutil.copy(common_assets / "qr_normal.png", assets_dir / "donate.png")
    shutil.copytree(common_assets / "spinner", assets_dir / "spinner")

  shutil.copytree(common_assets / str(icon_size) / "stations", assets_dir / "stations")
  shutil.copy(common_assets / str(icon_size) / "fontSize.png", assets_dir / "fontSize.png")
  shutil.copy(common_assets / str(icon_size) / "about.png", assets_dir / "about.png")

  # App.json
  app_json["targets"][target_id]["module"] = {
    "page": {
      "pages": [f"page/{i}" for i in pages]
    },
    **module
  }

with open("app.json", "w") as f:
  f.write(json.dumps(app_json, indent=2))
