import { Log, LogCollector, LogFunction, LogLevels } from "@/types/log.type";
import { LogLevel } from "better-auth";

export function createLogCollector(): LogCollector {
  const logs: Log[] = [];
  const getAll = () => logs;

  const logFunction = {} as Record<LogLevel, LogFunction>;
  LogLevels.forEach(
    (level) =>
      (logFunction[level] = (message: string) =>
        logs.push({ level, message, timestamp: new Date() })),
  );

  return {
    getAll,
    ...logFunction,
  };
}
