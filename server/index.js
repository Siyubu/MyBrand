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
   
    app.listen(process.env.PORT || 5000, function(){
        console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
      });

export default app;