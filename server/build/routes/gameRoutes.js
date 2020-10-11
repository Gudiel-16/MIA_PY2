"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class GamesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //ruta inicial
        this.router.get('/', (req, res) => res.send('Games'));
    }
}
const gamesRoutes = new GamesRoutes();
exports.default = gamesRoutes.router;
