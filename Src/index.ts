import { BROWSER_LOG, DEFAULT_ENVIRONMENT, TERMINAL_LOG } from './Constants/constants'

interface LoggerOptions
{
    environment: string,
    isUsingReact: boolean
}


class Logger
{
    environment: string;
    usingReact: boolean;

    constructor()
    {
        this.environment = DEFAULT_ENVIRONMENT, // Default environment
        this.usingReact = false // Default value for is using react
    }

    private getUserdefinedAndProjEnv(env: string|undefined, isUsingReact: boolean|undefined): [projenv: string|undefined, userdefinedenv: string]
    {
        const isPlatformReact = isUsingReact!==undefined ? isUsingReact : this.usingReact
        const projenv = isPlatformReact ? process.env.REACT_APP_LOGGER_ENVIRONMENT : process.env.LOGGER_ENVIRONMENT
        
        // const projenv_ = projenv ? projenv : Logger.defaultEnvironment
        const userDefinedEnv = env ? env : this.environment
    
        return [projenv, userDefinedEnv]
    }

    public normallog(message: any, env?: string, isUsingReact?: boolean)
    {
        const [projenv, userdefinedEnv] = this.getUserdefinedAndProjEnv(env, isUsingReact)
        if(projenv === userdefinedEnv)
        {
            console.log(message)
        }
    }

    public warnlog(message: any, logtype: string, env?: string, isUsingReact?: boolean)
    {
        const [projenv, userDefinedEnv] = this.getUserdefinedAndProjEnv(env, isUsingReact)
        if(projenv === userDefinedEnv)
        {
            logtype === BROWSER_LOG ? console.warn(message) : console.log("\x1b[33m%s\x1b[0m", message)
        }
    }

    public errorlog(message: any, logtype: string, env?: string, isUsingReact?: boolean)
    {
        const [projenv, userDefinedEnv] = this.getUserdefinedAndProjEnv(env, isUsingReact)
        if(projenv === userDefinedEnv)
        {
            logtype === BROWSER_LOG ? console.error(message) : console.log("\x1b[31m%s\x1b[0m", message)
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
        b_logger.environment = loggerOptions.environment
        b_logger.usingReact = loggerOptions.isUsingReact
        return b_logger
    }

    log(message: any, env?: string, isreact?: boolean)
    {
        this.normallog(message, env, isreact)
    }

    warn(message: any, env?: string, isreact?: boolean)
    {
      this.warnlog(message, BROWSER_LOG, env, isreact)  
    }

    error(message: any, env?: string, isreact?: boolean)
    {
        this.errorlog(message, BROWSER_LOG, env, isreact)
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
        t_logger.environment = loggerOptions.environment
        t_logger.usingReact = loggerOptions.isUsingReact
        return t_logger
    }

    log(message: any, env?: string, isUsingReact?: boolean)
    {
        this.normallog(message, env, isUsingReact)
    }

    warn(message: any, env?: string, isUsingReact?: boolean)
    {
      this.warnlog(message, TERMINAL_LOG, env, isUsingReact)  
    }

    error(message: any, env?: string, isUsingReact?: boolean)
    {
        this.errorlog(message, TERMINAL_LOG, env, isUsingReact)
    }
}

export const browserLogger = new BrowserLogger()
export const terminalLogger = new TerminalLogger()

