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
exports.indexControllerCorreoRecupPass = void 0;
//obtengo la base de datos
//import BD from '../database'
const oracledb = require('oracledb');
const nodemailer = require('nodemailer');
class IndexControllerCorreoRecupPass {
    enviarCorreoRecPass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { correo } = req.body;
            const Present = '<table class="egt" style="background-color:gray; width: 500px;">\
                    <tr>\
                    <td style="font-size: 35px; font-family: Georgia, \'Times New Roman\', Times, serif; text-align: center; border-bottom: dashed; border-color: black; color: white;">Recuperacion de Password</td>\
                    </tr>\
                    <tr>\
                    <td style="text-align: center; font-size: 17px; font-family: Arial, Helvetica, sans-serif; color:white;">\
                    <br>\
                    Para ingresar su nueva Password, porfavor hacer click en el boton de abajo.\
                    <br>\
                    </td>\
                    </tr>\
                    <tr>\
                    <td style="text-align: center;">\
                    <br>\
                    <form action="http://localhost:4200/login/recuperarPassword">\
                    <input style="padding: 15px; background-color: black;color: white;  border: none; font-size: 20px; width: 200px;" type="submit" value="RECUPERAR"/>\
                    </form>\
                    <br>\
                    </td>\
                    </tr>\
                    </table>';
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    type: "OAuth",
                    user: 'pweb.g16@gmail.com',
                    pass: 'ENLASnubes',
                    clientId: '186197231924-s2nvbq03jgaror4mvtrqhvpdakgv8r6m.apps.googleusercontent.com',
                    clientSecrect: 'p10IojeHKOfBDsBeRybMjpwd',
                    refreshToken: '1//04hTgndkMZcVGCgYIARAAGAQSNwF-L9IrYMeRCk5A7Dq69R82j5COXaAZv85q2ZbcZG1gNWhEoaRRh-Jz8UCsl4TS7dleFLT2D68',
                    accessToken: 'ya29.a0AfH6SMBVEg9A29cbaiH-KafFOyNk48PnZ5FDYRz3g4I6gl-7uTvWajfl-yAv_jug7RH3y2a85RdZGPapbBq9T7RHcyyL6BK1_x2wU5Y7mLukqZCXk2hNvE9p0LjfkNMApOPn4vLVKrygPpDcmjCRVbfJHjyK-uVUhX0',
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            const info = yield transporter.sendMail({
                from: 'GTSales MarketPlace Web <pweb.g16@gmail.com>',
                to: correo,
                subject: 'Recuperar Password, GTSales Marketplace',
                html: Present
            });
            console.log("message sent", info.messageId);
            res.status(201).send({ msg: "Correo Enviado" });
        });
    }
}
exports.indexControllerCorreoRecupPass = new IndexControllerCorreoRecupPass();
