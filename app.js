import './lib/zeppos/device-polyfill'
import { MessageBuilder } from './lib/zeppos/message'
import { ConfigStorage } from "./lib/mmk/ConfigStorage";

import {FsTools} from "./lib/mmk/Path";

const appId = 1030884;
FsTools.appTags = [
  "js_apps",
  appId.toString(16).padStart(8, "0").toUpperCase()
];

// MsgBuilder, config storage class
const messageBuilder = new MessageBuilder({ appId });
const config = new ConfigStorage();


App({
  globalData: {
    messageBuilder,
    config,
  },

  onCreate(options) {
    console.log("app.onCreate()");
    messageBuilder.connect();
    config.load();
  },

  onDestroy(options) {
    console.log("app.onDestroy()");
    messageBuilder.disConnect();
  }
})
