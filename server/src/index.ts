import express, {Application} from 'express';

import morgan from 'morgan';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';

import SocketIO  =require('socket.io');

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

        const serverWeb=this.app.listen(this.app.get('port'), () => {
            console.log("Ejecutando Server en port",this.app.get('port'));
        });

        //al socket le paso el servidor web
        const io=SocketIO.listen(serverWeb);

        //cada vez que alguien se conecte
        io.on('connection',(socket)=>{            
            socket.on('send-message',(data)=>{
                miMSJ.push(data);
                socket.emit('text-event',miMSJ);
                socket.broadcast.emit('text-event',miMSJ);
            });
        });
    }

}

const server = new Server();
server.start();