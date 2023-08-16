import { BROWSER_LOG, DEFAULT_ENVIRONMENT, TERMINAL_LOG } from './Constants/constants'

interface LoggerOptions
{
    loggerEnvironments: string[],
    isUsingReact: boolean
}


class Logger
{
    environments: string[];
    usingReact: boolean;

    constructor()
    {
        this.environments = [], // Default environments are empty
        this.usingReact = false // Default value for is using react
    }

    private getProjEnv(isUsingReact: boolean|undefined): string|undefined
    {
        const isPlatformReact = isUsingReact!==undefined ? isUsingReact : this.usingReact
        const projenv = isPlatformReact ? process.env.REACT_APP_LOGGER_ENVIRONMENT : process.env.LOGGER_ENVIRONMENT
        
        // const projenv_ = projenv ? projenv : Logger.defaultEnvironment
        // const userDefinedEnv = env ? env : this.environments
    
        return projenv
    }

    public normallog(message: any, env?: string, isUsingReact?: boolean)
    {
        const projenv = this.getProjEnv(isUsingReact)
        if(env && env === projenv)
        {
            console.log(message)
        }
        if(this.environments.length !== 0)
        {
            for(let i=0; i<this.environments.length; i++)
            {
                if(this.environments[i] === projenv && this.environments[i] !== env)
                {
                    console.log(message)
                    i += this.environments.length //  Break the loop
                }
            }
        }
        else if(!env && this.environments.length === 0)
        {
            console.log(message)
        }
    }

    public warnlog(message: any, logtype: string, env?: string, isUsingReact?: boolean)
    {
        const projenv = this.getProjEnv(isUsingReact)
        if(env && env === projenv)
        {
            logtype === BROWSER_LOG ? console.warn(message) : console.log("\x1b[33m%s\x1b[0m", message)
        }
        if(this.environments.length !== 0)
        {
            for(let i=0; i<this.environments.length; i++)
            {
                if(this.environments[i] === projenv)
                {
                    logtype === BROWSER_LOG ? console.warn(message) : console.log("\x1b[33m%s\x1b[0m", message)
                    i += this.environments.length //  Break the loop
                }
            }
        }
        else if(!env && this.environments.length === 0)
        {
            logtype === BROWSER_LOG ? console.warn(message) : console.log("\x1b[33m%s\x1b[0m", message)
        }
    }

    public errorlog(message: any, logtype: string, env?: string, isUsingReact?: boolean)
    {
        const projenv = this.getProjEnv(isUsingReact)
        if(env && env === projenv)
        {
            logtype === BROWSER_LOG ? console.error(message) : console.log("\x1b[31m%s\x1b[0m", message)
        }
        if(this.environments.length !== 0)
        {
            for(let i=0; i<this.environments.length; i++)
            {
                if(this.environments[i] === projenv)
                {
                    logtype === BROWSER_LOG ? console.error(message) : console.log("\x1b[31m%s\x1b[0m", message)
                    i += this.environments.length //  Break the loop
                }
            }
        }
        else if(!env && this.environments.length === 0)
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
        b_logger.environments = loggerOptions.loggerEnvironments
        b_logger.usingReact = loggerOptions.isUsingReact
        return b_logger
    }

    log(message: any, env?: string, isUsingReact?: boolean)
    {
        this.normallog(message, env, isUsingReact)
    }

    warn(message: any, env?: string, isUsingReact?: boolean)
    {
      this.warnlog(message, BROWSER_LOG, env, isUsingReact)  
    }

    error(message: any, env?: string, isUsingReact?: boolean)
    {
        this.errorlog(message, BROWSER_LOG, env, isUsingReact)
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
        t_logger.environments = loggerOptions.loggerEnvironments
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

