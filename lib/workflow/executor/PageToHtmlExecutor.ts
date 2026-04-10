import { ExecutionEnvironment } from "@/types/executor.type";
import { PageToHtmlTask } from "../task/PageToHtml";

export async function PageToHtmlExecutor(
  environment: ExecutionEnvironment<typeof PageToHtmlTask>,
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Web page");
    // console.log(websiteUrl);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
