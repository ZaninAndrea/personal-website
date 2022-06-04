declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production"
            GRAPHCMS_PROJECT_API: string
            GRAPHCMS_AUTH_TOKEN: string
            GRAPHCMS_PREVIEW_SECRET: string
            RELOAD_SECRET: string
        }
    }
}

export {}
