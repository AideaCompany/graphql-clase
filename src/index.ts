//Dependencies
// import helmet from 'helmet'
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Router } from "express";
import { graphqlHTTP } from "express-graphql";
import fs from "fs";
import { execute, GraphQLSchema, subscribe } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
// websocket
import { createServer } from "http";
//env config
import path from "path";
// @ts-ignore
import redis from "redis";
//config
import { $server } from "./config";
//Graphql
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/types";
import { IAuthMiddleware } from "./interfaces";
import connect from "./models";

var fileEnv = path.join(__dirname, "./.env.production");
var isProd = false;
try {
  fs.readFileSync(path.join(__dirname, "./.env.development"));
} catch (error: any) {
  isProd = true;
}

if (!isProd) {
  fileEnv = path.join(__dirname, "./.env.development");
}

dotenv.config({ path: fileEnv });

//App server
const app = express();

//moongose conecction
connect();

//Cors
const whitelist = [
  // Allow domains here
  "http://localhost:3000",
  "https://renap-ipass-panel.vercel.app",
  "https://renap-ipass-panel.vercel.app/",
  "https://renap.ipass.com.gt",
  "https://renap.ipass.com.gt/",
  "http://192.168.0.8:3000",
  "http://localhost:3001",
];
const corsOptions = {
  origin(origin: any, callback: any) {
    const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true,
};
app.use(cors(corsOptions));
//Helmet config
// app.use(helmet())
//Cookies
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
const route = Router();

app.use("/", route);
//Graphql config

const schema: GraphQLSchema = makeExecutableSchema({
  //@ts-ignore
  typeDefs,
  resolvers,
});

app.use(
  "/graphql",
  //@ts-ignore
  graphqlHTTP((req: IAuthMiddleware) => ({
    graphiql: true,
    schema: schema,
    pretty: true,
    context: {
      req,
      isProd,
    },
  }))
);

app.listen($server.port | 4000, () => {
  try {
    console.info("Server running on port:", $server.port);
    // return await getUserFromToken(connectionParams.Authorization)
  } catch (error: any) {
    console.error("Server crash", error);
    throw new Error(error);
  }
});

const ws = createServer(app);
