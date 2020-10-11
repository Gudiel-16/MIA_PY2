import { Router } from 'express';

class IndexRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        //ruta inicial
        this.router.get('/', (req,res) => res.send('Hello Initial'));
    }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
