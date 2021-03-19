import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import { corsMiddleware as enableCors } from './config/cors';
import { createUser, signIn } from 'app/user';

const swaggerDoc = YAML.load('./swagger.yaml');
const router = express.Router();

router.use((req, res, next) => {
  res.append('access-control-allow-origin', '*');
  next();
});

// Swagger
router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDoc));

// Users
router.post('/users/sign-up', enableCors, createUser);
router.post('/users/sign-in', enableCors, signIn);

export default router;
