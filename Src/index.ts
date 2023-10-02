import { BROWSER_LOG, TERMINAL_LOG } from "./Constants/constants";

interface LoggerOptions {
  loggerEnvironments: string[];
}

class LogObject {
  logTime = "";
  message = "";
  path = "";

  constructor(logTime: string, message: any, path?: string) {
    this.logTime = logTime;
    this.message = message;
    this.path = path ? path : "";
  }

  getObj() {
    return {
      time: this.logTime,
      message: this.message,
      path: this.path,
    };
  }
}

class Logger {
  private environments: string[] = ["development"]; // Default
  private envName: string | undefined = process.env.NODE_ENV;

  constructor() {
    this.environments = []; // Default environments are empty
  }

  static getProjEnv(obj: TerminalLogger | BrowserLogger): string | undefined {
    const projenv = obj.envName;
    return projenv;
  }

  static setEnvironments(obj: TerminalLogger | BrowserLogger, envs: string[]) {
    obj.environments = envs;
  }

  static getEnvironments(obj: BrowserLogger) {
    return obj.environments;
  }

  private static linenumber(position: number) {
    const err = new Error();
    return err.stack?.split("\n")[4].trim().split(" ")[position];
  }

  private static lineExists(val: string | undefined) {
    if (!val) return false;
    return true;
  }

  static setLog(obj: TerminalLogger | BrowserLogger, message: any, env?: string): void {
    const projenv = Logger.getProjEnv(obj);
    const callerInfo = this.lineExists(this.linenumber(2))
      ? this.linenumber(2)
      : this.linenumber(1);
    // const callerInfo = err.stack?.split("\n")[3].trim().split(" ")[1];

    // Assign the log object
    const logTime = `${new Date().toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })}`;
    const logObj = new LogObject(logTime, message, callerInfo?.replace("(", "").replace(")", ""));

    if (env && env === projenv) {
      console.log(logObj.getObj());
    }
    if (obj.environments.length !== 0) {
      for (let i = 0; i < obj.environments.length; i++) {
        if (obj.environments[i] === projenv && obj.environments[i] !== env) {
          console.log(logObj.getObj());
          i += obj.environments.length; //  Break the loop
        }
      }
    } else if (!env && !projenv && obj.environments.length === 0) {
      console.log(logObj.getObj());
    }
  }

  static setWarnlog(obj: TerminalLogger | BrowserLogger, message: any, env?: string) {
    const projenv = this.getProjEnv(obj);
    const callerInfo = this.lineExists(this.linenumber(2))
      ? this.linenumber(2)
      : this.linenumber(1);

    const logTime = `${new Date().toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })}`;
    const logObj = new LogObject(logTime, message, callerInfo?.replace("(", "").replace(")", ""));

    if (env && env === projenv) {
      console.log("\x1b[33m%s\x1b[0m", `Warning: `);
      console.log(logObj.getObj());
    }
    if (obj.environments.length !== 0) {
      for (let i = 0; i < obj.environments.length; i++) {
        if (obj.environments[i] === projenv) {
          console.log("\x1b[33m%s\x1b[0m", `Warning: `);
          console.log(logObj.getObj());
          i += obj.environments.length; //  Break the loop
        }
      }
    } else if (!env && !projenv && obj.environments.length === 0) {
      console.log("\x1b[33m%s\x1b[0m", `Warning: `);
      console.log(logObj.getObj());
    }
  }

  static setErrorlog(obj: TerminalLogger | BrowserLogger, message: any, env?: string) {
    const projenv = this.getProjEnv(obj);
    const callerInfo = this.lineExists(this.linenumber(2))
      ? this.linenumber(2)
      : this.linenumber(1);

    const logTime = `${new Date().toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })}`;
    const logObj = new LogObject(logTime, message, callerInfo?.replace("(", "").replace(")", ""));
    if (env && env === projenv) {
      console.log("\x1b[31m%s\x1b[0m", `Error: `);
      console.log(logObj.getObj());
    }
    if (obj.environments.length !== 0) {
      for (let i = 0; i < obj.environments.length; i++) {
        if (obj.environments[i] === projenv) {
          console.log("\x1b[31m%s\x1b[0m", `Error: `);
          console.log(logObj.getObj());
          i += obj.environments.length; //  Break the loop
        }
      }
    } else if (!env && !projenv && obj.environments.length === 0) {
      console.log("\x1b[31m%s\x1b[0m", `Error: `);
      console.log(logObj.getObj());
    }
  }
}

class BrowserLogger extends Logger {
  constructor() {
    super();
  }

  create(loggerOptions: LoggerOptions) {
    const b_logger = new BrowserLogger();
    Logger.setEnvironments(b_logger, loggerOptions.loggerEnvironments);
    return b_logger;
  }

  log(message: any) {
    const envs = Logger.getEnvironments(this);
    const projenv = Logger.getProjEnv(this);
    if (envs.length !== 0) {
      for (let i = 0; i < envs.length; i++) {
        if (envs[i] === projenv) {
          this.log = console.log.bind(
            console,
            `[${new Date().toLocaleString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}] `
          );
          i += envs.length; //  Break the loop
        }
      }
    } else if (!projenv && envs.length === 0) {
      this.log = console.log.bind(
        console,
        `[${new Date().toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}] `
      );
    }
  }

  warn(message: any) {
    const envs = Logger.getEnvironments(this);
    const projenv = Logger.getProjEnv(this);
    if (envs.length !== 0) {
      for (let i = 0; i < envs.length; i++) {
        if (envs[i] === projenv) {
          this.warn = console.warn.bind(
            console,
            `[${new Date().toLocaleString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}] `
          );
          i += envs.length; //  Break the loop
        }
      }
    } else if (!projenv && envs.length === 0) {
      this.warn = console.warn.bind(
        console,
        `[${new Date().toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}] `
      );
    }
  }

  error(message: any) {
    const envs = Logger.getEnvironments(this);
    const projenv = Logger.getProjEnv(this);
    if (envs.length !== 0) {
      for (let i = 0; i < envs.length; i++) {
        if (envs[i] === projenv) {
          this.error = console.error.bind(
            console,
            `[${new Date().toLocaleString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}] `
          );
          i += envs.length; //  Break the loop
        }
      }
    } else if (!projenv && envs.length === 0) {
      this.error = console.error.bind(
        console,
        `[${new Date().toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}] `
      );
    }
  }
}

class TerminalLogger extends Logger {
  constructor() {
    super();
  }

  create(loggerOptions: LoggerOptions) {
    const t_logger = new TerminalLogger();
    Logger.setEnvironments(t_logger, loggerOptions.loggerEnvironments);
    return t_logger;
  }

  log(message: any, env?: string) {
    Logger.setLog(this, message, env);
  }

  warn(message: any, env?: string) {
    Logger.setWarnlog(this, message, env);
  }

  error(message: any, env?: string) {
    Logger.setErrorlog(this, message, env);
  }
}

export const browserLogger = new BrowserLogger();
export const terminalLogger = new TerminalLogger();
