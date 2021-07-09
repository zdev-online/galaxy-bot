interface Config {
    token: string,
    dev: boolean,
    database: {
        database: string,
        host: string,
        port: number,
        user: string,
        password: string
    }
}

export default Config;