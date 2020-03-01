"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class BaseController {
    constructor() {
        this.router = express.Router();
        const limiter = require('express-limiter')(this.router);
        /*
        limiter({
            lookup: 'user.userId',
            // 150 requests per hour
            total: 1500,
            expire: 1000 * 60 * 60
        });
        */
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=BaseController.js.map