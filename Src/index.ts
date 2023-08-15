import 'dotenv/config'

interface LoggerOptions
{
    environment: string,
    isReact: boolean
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
        const isPlatformReact = isreact!==undefined ? isreact : Logger.defaultIsReact
        const projenv = isPlatformReact ? process.env.REACT_APP_LOGGER_ENVIRONMENT : process.env.LOGGER_ENVIRONMENT
        const userDefinedEnv = env ? env : Logger.defaultEnvironment

        const projenv_ = projenv ? projenv : Logger.defaultEnvironment

        if(projenv_ === userDefinedEnv)
        {
            console.log(message)
        }
    }
}

const logger = new Logger({environment: "development", isReact: false})

export default logger
