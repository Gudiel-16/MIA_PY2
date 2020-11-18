import express, {Application} from 'express';

import morgan from 'morgan';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';

import SocketIO  =require('socket.io');
import {indexControllerChat} from './controllers/controllersChat';

class Server{

    
    public app: Application;

    //se ejecuta al instanciar la clase, y devolvera objeto tipo express
    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    //encargado de configurar la variable app
    config(): void {
        this.app.set('port',process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false})); // para enviar desde un formulario html
    }
    
    //para definir de app las rutas de nuestro servidor
    routes(): void {
        this.app.use('/',indexRoutes);
    }

    //para poder inicializar el servidor
    start(): void {
        //array que para guardar msjs del socket
        const miMSJ:any=[];
        const miMSJ2:any=[];
        var idcaenv:number=0;

        /*const serverWeb=this.app.listen(this.app.get('port'), () => {
            console.log("Ejecutando Server en port",this.app.get('port'));
        });*/

        const serverWeb=this.app.listen(this.app.get('port'), "0.0.0.0", () => {
            console.log("Ejecutando Server en port",this.app.get('port'));
        });

        //al socket le paso el servidor web
        const io=SocketIO.listen(serverWeb);

        io.on('connection', (socket)=>{

            socket.on('subscribe', function(room) {
                console.log('joining room', room);
                socket.join(room);
            });

            socket.on('send-message', function(data) {
                console.log('Enviando en: ', data.room, ' ', data.message);
                miMSJ.push(data);

                indexControllerChat.insertar(data).then((res)=>{
                    indexControllerChat.conversacionChatServer(data).then((res)=>{
                        io.sockets.in(data.room).emit('conversation private', res);
                    });                    
                });
                //socket.broadcast.to(data.room).emit('conversation private', miMSJ);
                //socket.broadcast.to(data.room).emit('conversation private', miMSJ);
                
            });

        });

        //cada vez que alguien se conecte
        /*io.on('connection',(socket)=>{

            socket.on('send-message',(data)=>{
                miMSJ.push(data);
                miMSJ2.push(data);
                //lo envia el dueno del producto
                if(data["bandera"]==1){
                    data["id_c_Aenviar"]=idcaenv;
                //lo envia un cliente
                }else if(data["bandera"]==0){
                    idcaenv=data["id_c"];
                }
                indexControllerChat.insertar(data).then((res)=>{
                    indexControllerChat.datosParaCliente(data).then((res)=>{

                        const datosCliente=res;

                        indexControllerChat.datosParaVendedor(data).then((res)=>{
                            socket.emit('text-event',datosCliente);
                            socket.emit('text-event-2',res);  
                            socket.broadcast.emit('text-event',datosCliente);
                            socket.broadcast.emit('text-event-2',res);//dueno
                        });                        

                    });                    
                });           
            });
        });*/
    }

}

const server = new Server();
server.start();