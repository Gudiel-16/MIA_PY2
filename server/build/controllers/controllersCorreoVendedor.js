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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexControllerCorreoVendedor = void 0;
//obtengo la base de datos
//import BD from '../database'
const oracledb = require('oracledb');
//credenciales de conexion de base de datos
const keys_1 = __importDefault(require("../keys"));
const nodemailer = require('nodemailer');
class IndexControllerCorreoVendedor {
    enviarCorreoVendedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fecha, correo, nombre, filas, total, creditos, id_c } = req.body;
            const Present = '<table class="egt" style="background-color:black ; width: 500px;">\
                <tr>\
                <td colspan="4" style="font-size: 30px; font-family: Georgia, \'Times New Roman\', Times, serif; text-align: center; border-bottom: dashed; border-color: white; color: white;">\
                VENTA DE PRODUCTO:\
                </td>\
                </tr>\
                <tr>\
                <td colspan="4" style="text-align: center; font-size: 20px; font-family: Arial, Helvetica, sans-serif; color:white;">\
                <br>\
                Hola ' + nombre + ', a continuacion se muestra el detalle de productos vendidos:\
                <br>\
                </td>\
                </tr>\
                <tr>\
                <td colspan="4" style="font-size: 15px; font-family: Arial, Helvetica, sans-serif; color:white;">\
                <br>\
                Fecha: ' + fecha + '\
                <br>\
                <br>\
                </td>\
                </tr>\
                <tr style="background-color:darkred; color: white;">\
                <td style="padding: 10px; text-align: center;">NOMBRE</td>\
                <td style="padding: 10px; text-align: center;">PRECIO</td>\
                <td style="padding: 10px; text-align: center;"> CANTIDAD</td>\
                <td style="padding: 10px; text-align: center;">SUBTOTAL</td>\
                </tr>' + filas + '\
                <tr style="background-color:red; color: white;">\
                <td colspan="4" style="padding: 10px; text-align: center;">TOTAL: Q. ' + total + '</td>\
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
                subject: 'Venta de Productos, GTSales Marketplace',
                html: Present
            });
            console.log("message sent", info.messageId);
            var autoCommit = true;
            let sql = "update cliente set creditos=:creditos where id_c=:id_c";
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            let result = yield cnn.execute(sql, [creditos, id_c], { autoCommit });
            cnn.release();
            const descripcion = "Ha vendido productos";
            let sql2 = "insert into bitacora(correo,descripcion,fecha) values(:correo,:descripcion,:fecha)";
            let cnn2 = yield oracledb.getConnection(keys_1.default.cns);
            let result2 = yield cnn2.execute(sql2, [correo, descripcion, fecha], { autoCommit });
            cnn2.release();
            res.status(201).send({ msg: "Correo a Vendedor Enviado y actualizacion de Creditos, se guardo en bitacora" });
        });
    }
}
exports.indexControllerCorreoVendedor = new IndexControllerCorreoVendedor();
