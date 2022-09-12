// Configuration
import config from "./config.json";

// Interfaces
interface iDb {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
}

interface iSecurity {
  secretKey: string;
  expiresIn: string;
}

interface iServer {
  port: number;
  portReddis: number;
}

// Configurations
const { db, security, server } = config;

export const $db: iDb = db;
export const $security: iSecurity = security;
export const $server: iServer = server;
