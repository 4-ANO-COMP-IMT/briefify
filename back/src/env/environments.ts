import { config } from 'dotenv'

config()

type Environments = {
  POSTGRES_HOST: string
  PORT: string | number
  POSTGRES_PORT: string | number
  POSTGRES_USER: string 
  POSTGRES_DB: string 
  POSTGRES_PASSWORD: string 
  DEV_DATABASE_URL: string
  PROD_DATABSE_URL: string
  OPEN_AI_KEY: string
  DATABASE_URL: string
}

export const environments: Environments = {
  POSTGRES_HOST: process.env.POSTGRES_HOST || 'localhost',
  PORT: process.env.PORT || 3000,
  POSTGRES_PORT: process.env.POSTGRES_PORT || 5432,
  POSTGRES_USER: process.env.POSTGRES_USER || 'local_user',
  POSTGRES_DB: process.env.POSTGRES_DB || 'local_db',
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || '',
  DEV_DATABASE_URL: process.env.DEV_DATABASE_URL || '',
  PROD_DATABSE_URL: process.env.PROD_DATABSE_URL || '',
  OPEN_AI_KEY: process.env.OPEN_AI_KEY || '',
  DATABASE_URL: process.env.DATABASE_URL || ''
}