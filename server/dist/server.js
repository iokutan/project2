"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const passport = require("passport");
const databaseSettings = require("./config/config");
const cors = require("cors");
const path = require("path");
const auth_1 = require("./auth/auth");
const models_1 = require("./models");
const index_1 = require("./controllers/index");
const logger_1 = require("./lib/logger");
const fileUpload = require("express-fileupload");
class Server {
    constructor() { }
    static initializeApp() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                Server.app = express();
                Server.configureApp();
                Server.initializeAuth();
                try {
                    yield Server.initializeDatabase();
                    logger_1.logger.debug('Database open [STARTED]...');
                }
                catch (error) {
                    logger_1.logger.error('Failed to initialize database', error);
                }
                index_1.Controller.initializeControllers(Server.app);
                return Server.app.listen(Server.app.get('port'));
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static initializeDatabase() {
        const sequelizeConfig = databaseSettings.config.development;
        const models = new models_1.Models(sequelizeConfig);
        return models.initModels();
    }
    static initializeAuth() {
        Server.app.use(passport.initialize());
        auth_1.Auth.serializeUser();
        auth_1.Auth.useBearerStrategy();
        auth_1.Auth.useLocalStrategy();
    }
    static configureApp() {
        Server.app.use(fileUpload({ createParentPath: true }));
        Server.app.use('*', cors());
        Server.app.set('port', process.env.PORT || 3001);
        Server.app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
        Server.app.use(bodyParser.json({ limit: '100mb' }));
        Server.app.use(compression());
        Server.app.use(express.static(path.join(__dirname, '../public')));
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map