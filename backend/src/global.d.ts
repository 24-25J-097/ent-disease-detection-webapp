import http from "http";
import https from "https";

type ObjectId = import('mongoose').Types.ObjectId;
type Server = https.Server | http.Server;

declare global {
    namespace Express {

        export interface Response {
            sendSuccess: (data: unknown, message?: string) => void;
            sendError: (error: unknown, errorCode?: number) => void;
        }

    }
}
