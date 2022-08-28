import type { SwaggerDefinition } from 'swagger-jsdoc';
import Config from '../config/Config';

export default <SwaggerDefinition>{
  openapi: '3.0.0',
  info: {
    title: 'mongo-node-typescript-todo-app API documentation',
    version: '1.0.0',
  },
  servers: [
    {
      url: `http://localhost:${Config.port}/v1`,
    },
  ],
};
