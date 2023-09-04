import {
  ICON_SIZE_MEDIUM,
  IS_LOW_RAM_DEVICE,
  SCREEN_WIDTH,
  SCREEN_HEIGHT, SCREEN_MARGIN_X, WIDGET_WIDTH
} from "./mmk/UiParams";


export function createOfflineScreen(text) {
      hmUI.createWidget(hmUI.widget.IMG, {
          x: (SCREEN_WIDTH - 48) / 2,
          y: (SCREEN_HEIGHT - 48) / 2,
          src: "offline.png",
      });
      hmUI.createWidget(hmUI.widget.TEXT, {
          x: SCREEN_MARGIN_X,
          y: (SCREEN_HEIGHT - 48) / 2 + 56,
          w: WIDGET_WIDTH,
          h: 96,
          align_h: hmUI.align.CENTER_H,
          text_style: hmUI.text_style.WRAP,
          text_size: this.fontSize,
          text,
          color: 0x999999,
      })
}

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
