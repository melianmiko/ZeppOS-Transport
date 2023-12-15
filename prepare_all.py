from pathlib import Path
from PIL import Image
import json
import shutil
import os
import requests

project = Path(".").resolve()
common_assets = project / "assets" / "common"

print("Loading zepp devices list...")
zepp_devices = requests.get("https://raw.githubusercontent.com/melianmiko/ZeppOS-DevicesList/main/zepp_devices.json").json()

module = {
  "page": {
    "pages": [
      "page/HomeScreen",
      "page/ViewStation",
      "page/FontSizeSetupScreen",
      "page/AboutScreen",
      "page/DonateScreen"
    ]
  },
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
app_json["targets"] = {}
for target_data in zepp_devices:
  target_id = target_data["id"]
  assets_dir = project / "assets" / target_id
  if assets_dir.is_dir():
    shutil.rmtree(assets_dir)
  assets_dir.mkdir()

  # Icon
  i = Image.open(common_assets / "icon.png")
  i.thumbnail((target_data['iconSize'], target_data['iconSize']))
  i.save(assets_dir / "icon.png")

  # Icons
  if target_data["screenShape"] == "band":
    icon_size = 24
    shutil.copy(common_assets / "qr_small.png", assets_dir / "donate.png")
    shutil.copy(common_assets / "spinner.png", assets_dir / "spinner.png")
  else:
    icon_size = 32
    shutil.copy(common_assets / "qr_normal.png", assets_dir / "donate.png")
    shutil.copytree(common_assets / "spinner", assets_dir / "spinner")

  shutil.copy(common_assets / "offline.png", assets_dir / "offline.png")
  shutil.copytree(common_assets / str(icon_size) / "stations", assets_dir / "stations")
  shutil.copy(common_assets / str(icon_size) / "fontSize.png", assets_dir / "fontSize.png")
  shutil.copy(common_assets / str(icon_size) / "about.png", assets_dir / "about.png")

  # App.json
  app_json["targets"][target_id] = {
    "platforms": [],
    "module": module
  }

  for i, source in enumerate(target_data["deviceSource"]):
    app_json["targets"][target_id]["platforms"].append({
      "name": f"{target_id}{i}",
      "deviceSource": source
    })

with open("app.json", "w") as f:
  f.write(json.dumps(app_json, indent=2))
