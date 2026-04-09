import z from "zod";
import { LaunchBrowserExecutor } from "./LaunchBrowserExecutor";

export const ExecutorRegistry = {
  LAUNCH_BROWSER: LaunchBrowserExecutor,
  PAGE_TO_HTML: () => {
    return Promise.resolve(true);
  },
  EXTRACT_TEXT_FROM_ELEMENT: () => Promise.resolve(true),
};
