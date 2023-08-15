import 'dotenv/config'
import { BROWSER_LOG, DEFAULT_ENVIRONMENT, TERMINAL_LOG } from './Constants/constants'

interface LoggerOptions
{
    environment: string,
    isReact: boolean
}


const getUserdefinedAndProjEnv = (env: string|undefined, isreact: boolean|undefined): [projenv: string|undefined, userdefinedenv: string]=>{
    const isPlatformReact = isreact!==undefined ? isreact : Logger.defaultIsReact
    const projenv = isPlatformReact ? process.env.REACT_APP_LOGGER_ENVIRONMENT : process.env.LOGGER_ENVIRONMENT
    
    // const projenv_ = projenv ? projenv : Logger.defaultEnvironment
    const userDefinedEnv = env ? env : Logger.defaultEnvironment

    return [projenv, userDefinedEnv]
}


class Logger
{
    static defaultEnvironment: string;
    static defaultIsReact: boolean;

    constructor(loggerOptions: LoggerOptions)
    {
        const {environment, isReact} = loggerOptions
        Logger.defaultEnvironment = environment,
        Logger.defaultIsReact = isReact
    }

    static normallog(message: string, env?: string, isreact?: boolean)
    {
        const [projenv, userdefinedEnv] = getUserdefinedAndProjEnv(env, isreact)
        if(projenv === userdefinedEnv)
        {
            console.log(message)
        }
    }

    static warnlog(message: string, logtype: string, env?: string, isreact?: boolean)
    {
        const [projenv, userDefinedEnv] = getUserdefinedAndProjEnv(env, isreact)
        if(projenv === userDefinedEnv)
        {
            logtype === BROWSER_LOG ? console.warn(message) : console.log("\x1b[33m%s\x1b[0m", message)
        }
    }

    static errorlog(message: string, logtype: string, env?: string, isreact?: boolean)
    {
        const [projenv, userDefinedEnv] = getUserdefinedAndProjEnv(env, isreact)
        if(projenv === userDefinedEnv)
        {
            logtype === BROWSER_LOG ? console.error(message) : console.log("\x1b[31m%s\x1b[0m", message)
        }
    }
}


class BrowserLogger extends Logger
{
    constructor(loggerOptions: LoggerOptions)
    {
        super(loggerOptions)
    }

    create(loggerOptions: LoggerOptions)
    {
        const b_logger = new BrowserLogger(loggerOptions)
        return b_logger
    }

    log(message: string, env?: string, isreact?: boolean)
    {
        Logger.normallog(message, env, isreact)
    }

    warn(message: string, env?: string, isreact?: boolean)
    {
      Logger.warnlog(message, BROWSER_LOG, env, isreact)  
    }

    error(message: string, env?: string, isreact?: boolean)
    {
        Logger.errorlog(message, BROWSER_LOG, env, isreact)
    }
}


class TerminalLogger extends Logger
{
    constructor(loggerOptions: LoggerOptions)
    {
        super(loggerOptions)
    }

    create(loggerOptions: LoggerOptions)
    {
        const t_logger = new TerminalLogger(loggerOptions)
        return t_logger
    }

    log(message: string, env?: string, isreact?: boolean)
    {
        Logger.normallog(message, env, isreact)
    }

    warn(message: string, env?: string, isreact?: boolean)
    {
      Logger.warnlog(message, TERMINAL_LOG, env, isreact)  
    }

    error(message: string, env?: string, isreact?: boolean)
    {
        Logger.errorlog(message, TERMINAL_LOG, env, isreact)
    }
}

export const browserLogger = new BrowserLogger({environment: DEFAULT_ENVIRONMENT, isReact: false})
export const terminalLogger = new TerminalLogger({environment: DEFAULT_ENVIRONMENT, isReact: false})

