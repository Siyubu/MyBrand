import 'babel-polyfill';
import express from 'express';
import routes from './routes/index.js';
import bodyParser from 'body-parser';
import swaggerDocument from '../swagger.json';
import swaggerUi from 'swagger-ui-express';
const port1 = process.env.port|| 5000;

    const app = express();
    
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(express.json());
    app.use("/api", routes);
    app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
   
app.listen(port1,()=>console.log(`listeeeening on port ${port1} ...`));

export default app;