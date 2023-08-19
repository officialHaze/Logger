import { BROWSER_LOG, TERMINAL_LOG } from './Constants/constants'

interface LoggerOptions
{
    loggerEnvironments: string[],
    environmentName: string,
}


class Logger
{
    private environments: string[];
    private envName:  string;

    constructor()
    {
        this.environments = [], // Default environments are empty
        this.envName = "LOGGER_ENVIRONMENT" // Default env name
    }

    private static getProjEnv(obj: TerminalLogger|BrowserLogger): string|undefined
    {
        const projenv = process.env[obj.envName]
        console.log(`Project environment ---> ${projenv}`)
    
        return projenv
    }

    static setEnvironments(obj: TerminalLogger|BrowserLogger, envs: string[])
    {
        obj.environments = envs
    }

    static setEnvName(obj: TerminalLogger|BrowserLogger, name: string)
    {
        obj.envName = name
    }

    static setLog(obj: TerminalLogger|BrowserLogger, message: any, env?: string): void
    {
        const projenv = Logger.getProjEnv(obj)
        if(env && env === projenv)
        {
            console.log(message)
        }
        if(obj.environments.length !== 0)
        {
            for(let i=0; i<obj.environments.length; i++)
            {
                if(obj.environments[i] === projenv && obj.environments[i] !== env)
                {
                    console.log(message)
                    i += obj.environments.length //  Break the loop
                }
            }
        }
        else if(!env && !projenv && obj.environments.length === 0)
        {
            console.log(message)
        }
    }

    static setWarnlog(obj: TerminalLogger|BrowserLogger, message: any, logtype: string, env?: string)
    {
        const projenv = this.getProjEnv(obj)
        if(env && env === projenv)
        {
            logtype === BROWSER_LOG ? console.warn(message) : console.log("\x1b[33m%s\x1b[0m", message)
        }
        if(obj.environments.length !== 0)
        {
            for(let i=0; i<obj.environments.length; i++)
            {
                if(obj.environments[i] === projenv)
                {
                    logtype === BROWSER_LOG ? console.warn(message) : console.log("\x1b[33m%s\x1b[0m", message)
                    i += obj.environments.length //  Break the loop
                }
            }
        }
        else if(!env && !projenv && obj.environments.length === 0)
        {
            logtype === BROWSER_LOG ? console.warn(message) : console.log("\x1b[33m%s\x1b[0m", message)
        }
    }

    static setErrorlog(obj: TerminalLogger|BrowserLogger, message: any, logtype: string, env?: string)
    {
        const projenv = this.getProjEnv(obj)
        if(env && env === projenv)
        {
            logtype === BROWSER_LOG ? console.error(message) : console.log("\x1b[31m%s\x1b[0m", message)
        }
        if(obj.environments.length !== 0)
        {
            for(let i=0; i<obj.environments.length; i++)
            {
                if(obj.environments[i] === projenv)
                {
                    logtype === BROWSER_LOG ? console.error(message) : console.log("\x1b[31m%s\x1b[0m", message)
                    i += obj.environments.length //  Break the loop
                }
            }
        }
        else if(!env && !projenv && obj.environments.length === 0)
        {
            console.log(message)
        }
    }
}


class BrowserLogger extends Logger
{
    constructor()
    {
        super()
    }

    create(loggerOptions: LoggerOptions)
    {
        const b_logger = new BrowserLogger()
        Logger.setEnvironments(b_logger, loggerOptions.loggerEnvironments)
        Logger.setEnvName(b_logger, loggerOptions.environmentName)
        return b_logger
    }

    log(message: any, env?: string)
    {
        Logger.setLog(this, message, env)
    }

    warn(message: any, env?: string)
    {
      Logger.setWarnlog(this, message, BROWSER_LOG, env)  
    }

    error(message: any, env?: string)
    {
        Logger.setErrorlog(this, message, BROWSER_LOG, env)
    }
}


class TerminalLogger extends Logger
{
    constructor()
    {
        super()
    }

    create(loggerOptions: LoggerOptions)
    {
        const t_logger = new TerminalLogger()
        Logger.setEnvironments(t_logger, loggerOptions.loggerEnvironments)
        Logger.setEnvName(t_logger, loggerOptions.environmentName)
        return t_logger
    }

    log(message: any, env?: string)
    {
        Logger.setLog(this, message, env)
    }

    warn(message: any, env?: string)
    {
      Logger.setWarnlog(this, message, TERMINAL_LOG, env)  
    }

    error(message: any, env?: string)
    {
        Logger.setErrorlog(this, message, TERMINAL_LOG, env)
    }
}

export const browserLogger = new BrowserLogger()
export const terminalLogger = new TerminalLogger()

