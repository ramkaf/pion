import swaggerJsdoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Pion Project API',
    version: '1.0.0',
    description: 'API documentation for Pion Project',
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT}`,
      description: 'swagger api for pion project',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [
    './src/modules/course/routes/*.ts',
    './src/modules/admin/routes/*.ts',
    './src/modules/booking/routes/*.ts',
    './src/modules/member/routes/*.ts',
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;