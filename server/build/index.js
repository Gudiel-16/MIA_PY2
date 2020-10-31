"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const SocketIO = require("socket.io");
const controllersChat_1 = require("./controllers/controllersChat");
class Server {
    //se ejecuta al instanciar la clase, y devolvera objeto tipo express
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    //encargado de configurar la variable app
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false })); // para enviar desde un formulario html
    }
    //para definir de app las rutas de nuestro servidor
    routes() {
        this.app.use('/', indexRoutes_1.default);
    }
    //para poder inicializar el servidor
    start() {
        //array que para guardar msjs del socket
        const miMSJ = [];
        var idcaenv = 0;
        const serverWeb = this.app.listen(this.app.get('port'), () => {
            console.log("Ejecutando Server en port", this.app.get('port'));
        });
        //al socket le paso el servidor web
        const io = SocketIO.listen(serverWeb);
        //cada vez que alguien se conecte
        io.on('connection', (socket) => {
            console.log("Usuario Conectado");
            socket.on('send-message', (data) => {
                miMSJ.push(data);
                //lo envia el dueno del producto
                if (data["bandera"] == 1) {
                    data["id_c_Aenviar"] = idcaenv;
                    //lo envia un cliente
                }
                else if (data["bandera"] == 0) {
                    idcaenv = data["id_c"];
                }
                controllersChat_1.indexControllerChat.insertar(data).then((res) => {
                    console.log(res);
                });
                socket.emit('text-event', miMSJ);
                socket.broadcast.emit('text-event', miMSJ);
            });
        });
    }
}
const server = new Server();
server.start();
