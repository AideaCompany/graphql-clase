import { Request } from "express";
// @ts-ignore
import { RedisClient } from "redis";

export interface IAuthMiddleware extends Request {
  isAuth: boolean;
  tokenAuth: string;
}

export interface IContextGraphql {
  req: IAuthMiddleware;
  isProd: boolean;
  client: RedisClient;
}
