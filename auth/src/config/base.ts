export const ENVIRONMENT = process.env.APP_ENV || 'DEV'
export const IS_PRODUCTION = ENVIRONMENT === ''
export const IS_TEST = ENVIRONMENT === ''
export const PORT = Number(process.env.APP_PORT) || 3001

export const DB_USERNAME = process.env.DB_USERNAME || "";
export const DB_PASSWORD = process.env.DB_PASSWORD || "";

export const JWT_SECRET = process.env.JWT_SECRET || '98awes$34ds5bg$#h45gb43%w98hg3w@84weg'
export const JWT_EXPIRE = process.env.JWT_EXPIRE || '30d'

export const DB_URI = process.env.DB_URI || 'mongodb://auth-mongo-srv:27017/'
