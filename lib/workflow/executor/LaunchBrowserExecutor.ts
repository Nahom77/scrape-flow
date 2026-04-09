import { ExecutionEnvironment } from "@/types/executor.type";
import puppeteer from "puppeteer";

export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment,
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
