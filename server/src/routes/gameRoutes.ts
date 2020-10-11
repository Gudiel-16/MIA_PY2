import { Router } from 'express';

class GamesRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        //ruta inicial
        this.router.get('/', (req,res) => res.send('Games'));        
    }
}

const gamesRoutes = new GamesRoutes();
export default gamesRoutes.router;