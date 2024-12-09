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
  tags: [
    { name: 'Auth' },
    { name: 'Admin' },
    { name: 'Member' },
    { name: 'Courses' },
    { name: 'Booking' },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/modules/**/routes/*.ts"], 
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;