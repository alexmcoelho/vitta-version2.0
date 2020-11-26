import { Router } from 'express';
import territoriesRouter from '@modules/territories/infra/http/routes/territories.routes';

const routes = Router();
routes.use('/territories', territoriesRouter);

export default routes;
