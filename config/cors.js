import cors from 'cors';

const corsOrigin = /.+\.localhost(:\d{1,6})?$/;

const corsMiddleware = cors({
  allowedHeaders: ['x-user-id', 'authorization', 'content-type'],
  origin: corsOrigin,
  exposedHeaders: ['location'],
});

export { corsMiddleware, corsOrigin };
