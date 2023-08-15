

interface LoggerOptions
{
    environment: string,
    isReact: boolean
}


export class Logger
{
    static environment: string = "development"
    static isReact: boolean = false

    constructor(loggerOptions: LoggerOptions)
    {
        const {environment, isReact} = loggerOptions
        Logger.environment = environment,
        Logger.isReact = isReact
    }

    static log(message: string, env: string | null | undefined, isreact: boolean | null | undefined)
    {
        const isReactPlatform = isreact ? isreact : Logger.isReact
        const projenv = isReactPlatform ? process.env.REACT_APP_LOGGER_ENVIRONMENT : process.env.LOGGER_ENVIRONMENT
        const userDefinedEnv = env ? env : Logger.environment

        const projenv_ = projenv ? projenv : Logger.environment

        if(projenv_ === userDefinedEnv)
        {
            console.log(message)
        }
    }
}

