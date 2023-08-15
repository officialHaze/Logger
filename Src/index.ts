import 'dotenv/config'
import { DEFAULT_ENVIRONMENT } from './Constants/constants'

interface LoggerOptions
{
    environment: string,
    isReact: boolean
}


const getUserdefinedAndProjEnv = (env: string|undefined, isreact: boolean|undefined): [projenv: string, userdefinedenv: string]=>{
    const isPlatformReact = isreact!==undefined ? isreact : Logger.defaultIsReact
    const projenv = isPlatformReact ? process.env.REACT_APP_LOGGER_ENVIRONMENT : process.env.LOGGER_ENVIRONMENT
    
    const projenv_ = projenv ? projenv : Logger.defaultEnvironment
    const userDefinedEnv = env ? env : Logger.defaultEnvironment

    return [projenv_, userDefinedEnv]
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

    create(loggerOptions: LoggerOptions)
    {
        const logger = new Logger(loggerOptions)
        return logger
    }

    log(message: string, env?: string, isreact?: boolean)
    {
        const [projenv, userdefinedEnv] = getUserdefinedAndProjEnv(env, isreact)
        if(projenv === userdefinedEnv)
        {
            console.log(message)
        }
    }

    warn(message: string, env?: string, isreact?: boolean)
    {
        const [projenv, userDefinedEnv] = getUserdefinedAndProjEnv(env, isreact)
        if(projenv === userDefinedEnv)
        {
            console.warn(message)
        }
    }
}

const logger = new Logger({environment: DEFAULT_ENVIRONMENT, isReact: false})

export default logger
