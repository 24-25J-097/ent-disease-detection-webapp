// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="global.d.ts" />
import "dotenv/config";
import express from "express";
import * as favPath from 'path';

const expressApp = async () => {

    const app = express();


    app.use(express.json({limit: '20mb'}));
    app.use(express.urlencoded({limit: '20mb', extended: true}));


    app.use('/static', express.static(favPath.join(__dirname, "../resources")));

    app.get('', (req, res) => {
        res.json("ENT Insight API™ Automated Medical Conditions Detection in E.N.T Images Using Deep Learning Techniques").status(200);
    });


    return app;
}


export default expressApp;
