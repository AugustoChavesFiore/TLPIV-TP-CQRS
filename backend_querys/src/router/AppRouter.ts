
import { Request, Response, Router } from 'express';
import { ProductRoutes } from './products.rutes';


export class AppRouter {
     static get routes(): Router {
          const router = Router();

          router.get('/', (req: Request, res: Response) => {
               res.send('Hello from Server whit Typescript and POO');
          });


          router.use('/products', ProductRoutes.routes);


          return router;
     };

};