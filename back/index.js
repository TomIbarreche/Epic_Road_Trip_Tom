const express = require('express');
const config = require('./src/config/config');
const session = require('express-session');
const redis = require('redis');
const cors = require('cors');
const authRouter = require('./src/route/auth');
const userRouter = require('./src/route/user');
const routeRouter = require('./src/route/route');
const routeStepRouter = require('./src/route/route_step');
const routeStepReviewRouter = require('./src/route/route_step_review');
const routeDataRouter = require('./src/route/route_data');
const preferenceRouter = require('./src/route/preference');

const apiErrorHandler = require('./src/middleware/api-error-handler');
const fs = require('fs');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');

if(process.env.NODE_ENV !== "production"){
    require('dotenv/config');
}

let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient({
    host: config.redis_url,
    port: config.refis_port
})
let path = __dirname + '/src/swagger.yaml';
let data = fs.readFileSync( path, 'utf8');
let swaggerConfig = yaml.load(data);
const specs = swaggerJsDoc(swaggerConfig);

const app=express();

app.enable("trust proxy");
app.use(cors({}));
app.use(session({
    store: new RedisStore({client: redisClient}),
    secret: config.session_secret,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 30000
    }
}))
app.use(express.json());
app.use('/api/v1/routes', routeRouter);
app.use('/api/v1/routes_steps', routeStepRouter);
app.use('/api/v1/routes_steps_reviews', routeStepReviewRouter);
app.use('/api/v1/routes_data', routeDataRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1', authRouter);
app.use('/api/v1/preferences', preferenceRouter);
app.get("/api/v1", (req,res) => {
    res.send("Work in progress");
})
app.use(apiErrorHandler);
app.use("/api/v1/api-docs", swaggerUi.serve, swaggerUi.setup(specs, {explorer: true}));

const listen = app.listen(config.port, () => {
    console.log(`server is running in port ${config.port} and in ${config.name} mode`);
});

module.exports = {app: app, redisClient: redisClient};
module.exports.port=listen.address().port;
