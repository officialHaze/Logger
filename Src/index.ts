import 'dotenv/config'

interface LoggerOptions
{
    environment: string,
    isReact: boolean
}


class Logger
{
    environment: string = "development"
    isReact: boolean = false

    create(loggerOptions: LoggerOptions)
    {
        const {environment, isReact} = loggerOptions
        this.environment = environment,
        this.isReact = isReact
    }

    log(message: string, env: string | null | undefined, isreact: boolean | null | undefined)
    {
        const isReactPlatform = isreact ? isreact : this.isReact
        const projenv = isReactPlatform ? process.env.REACT_APP_LOGGER_ENVIRONMENT : process.env.LOGGER_ENVIRONMENT
        const userDefinedEnv = env ? env : this.environment

        const projenv_ = projenv ? projenv : this.environment

        if(projenv_ === userDefinedEnv)
        {
            console.log(message)
        }
    }
}

const logger = new Logger()

export default logger

