
import express from 'express';
import routes from './server/routes/index.js';
import bodyParser from 'body-parser';

    const app = express();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(express.json());
    app.use("/api", routes);
    const port1 = process.env.port|| 5000;
app.listen(port1,()=>console.log(`listeeeening on port ${port1} ...`));
