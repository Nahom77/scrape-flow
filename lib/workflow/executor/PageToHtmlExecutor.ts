import { ExecutionEnvironment } from "@/types/executor.type";
import { PageToHtmlTask } from "../task/PageToHtml";

export async function PageToHtmlExecutor(
  environment: ExecutionEnvironment<typeof PageToHtmlTask>,
): Promise<boolean> {
  try {
    const html = await environment.getPage()?.content();
    console.log("@HTML", html);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
