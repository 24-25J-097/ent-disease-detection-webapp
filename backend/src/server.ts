import * as fs from "fs";
import * as http from "http";
import * as https from "https";
import expressApp from "./app";

const startServer = async () => {
    const app = await expressApp();

    const isProduction = process.env.NODE_ENV === "production";
    const port = process.env.PORT;
    let server: https.Server | http.Server;

    console.log("isProduction : " + isProduction)
    if (isProduction) {
        server = https.createServer({
            key: fs.readFileSync(process.env.SERVER_KEY_PATH || 'server.key'),
            cert: fs.readFileSync(process.env.SERVER_CERT_PATH || 'server.cert')
        }, app);
    } else {
        server = new http.Server(app);
    }

    server.listen(port, () => {
        console.log('--> HTTPS Server successfully started at port: ' + port);
    });

}

startServer();
