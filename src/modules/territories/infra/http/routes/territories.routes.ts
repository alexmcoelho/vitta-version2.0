import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AppError from '@shared/errors/AppError';
import TerritoriesController from '../controllers/TerritoriesController';

const territoriesRouter = Router();
const territoriesController = new TerritoriesController();

territoriesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      start: Joi.object()
        .keys({
          x: Joi.number().required(),
          y: Joi.number().required(),
        })
        .required(),
      end: Joi.object()
        .keys({
          x: Joi.number().required(),
          y: Joi.number().required(),
        })
        .required(),
    },
  }),
  territoriesController.create,
);

territoriesRouter.get('/', territoriesController.list);

territoriesRouter.delete('/:id', territoriesController.delete);

export default territoriesRouter;
