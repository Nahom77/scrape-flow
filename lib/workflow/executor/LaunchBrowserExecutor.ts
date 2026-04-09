import { ExecutionEnvironment } from "@/types/executor.type";
import puppeteer from "puppeteer";
import { LaunchBrowserTask } from "../task/LaunchBrowser";

export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>,
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Website Url");
    console.log(websiteUrl);
    const browser = await puppeteer.launch({
      headless: false,
    });

    setTimeout(async () => {
      await browser.close();
    }, 3000);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
