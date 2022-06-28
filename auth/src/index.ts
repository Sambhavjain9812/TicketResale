import express from "express";
import morgan from "morgan"
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import compression from 'compression'
import cors from 'cors'
import cookieSession from "cookie-session";
import router from "./routes";
import { corsOptions } from "./config";
import { ENVIRONMENT } from "./config/base";


const app = express();

//As we are using ingress nginx!
app.set('trust proxy', true);

app.use(express.json());
if(ENVIRONMENT === 'DEV') app.use(morgan('dev'));
app.use(helmet())
app.use(express.json())

app.use(cookieSession({
    signed: false,
    secure: true
}));
app.use(express.urlencoded({ extended: true }))
app.use(mongoSanitize())
app.use(compression())
app.use(cors(corsOptions))

router.get("/", (_req,res,_next)=>{
    res.send('Authentication server!');
});

app.use("/", router);

app.use((_req,res,_next)=>{
    res.status(404).send('Not Found!');
})

export default app;