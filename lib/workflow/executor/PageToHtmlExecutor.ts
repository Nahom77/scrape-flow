import { ExecutionEnvironment } from "@/types/executor.type";
import { PageToHtmlTask } from "../task/PageToHtml";

export async function PageToHtmlExecutor(
  environment: ExecutionEnvironment<typeof PageToHtmlTask>,
): Promise<boolean> {
  try {
    const browser = environment.getBrowser();
    // console.log(websiteUrl);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
