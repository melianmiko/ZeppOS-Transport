import { 
  ICON_SIZE_MEDIUM, 
  IS_LOW_RAM_DEVICE, 
  SCREEN_WIDTH, 
  SCREEN_HEIGHT 
} from "./mmk/UiParams";

export function createSpinnerLowRam() {
  const spinner = hmUI.createWidget(hmUI.widget.IMG, {
    x: Math.floor((SCREEN_WIDTH - ICON_SIZE_MEDIUM) / 2),
    y: Math.floor((SCREEN_HEIGHT - ICON_SIZE_MEDIUM) / 2),
    src: "spinner.png"
  });
  return () => hmUI.deleteWidget(spinner);
}

export function createSpinner() {
  if(IS_LOW_RAM_DEVICE) return createSpinnerLowRam();

  const spinner = hmUI.createWidget(hmUI.widget.IMG_ANIM, {
    x: Math.floor((SCREEN_WIDTH - ICON_SIZE_MEDIUM) / 2),
    y: Math.floor((SCREEN_HEIGHT - ICON_SIZE_MEDIUM) / 2),
    anim_path: "spinner",
    anim_prefix: "img",
    anim_ext: "png",
    anim_fps: 12,
    anim_size: 12,
    anim_status: hmUI.anim_status.START,
    repeat_count: 0,
  });

  return () => hmUI.deleteWidget(spinner);
}
