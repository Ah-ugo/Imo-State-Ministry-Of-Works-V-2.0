/** @format */

import { createSwaggerSpec } from 'next-swagger-doc';
import fs from 'fs';
import path from 'path';

export const getApiDocs = () => {
  const spec = createSwaggerSpec({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Imo State Ministry of Works API',
        version: '1.0.0',
        description: 'API documentation for the Imo State Ministry of Works',
      },
      servers: [
        {
          url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
          description: 'Development server',
        },
        {
          url: 'https://imostateministryofworks.vercel.app',
          description: 'Production server',
        },
      ],
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          BearerAuth: [],
        },
      ],
    },
    apiFolder: 'src/app/api/v1',
  });

  if (process.env.NODE_ENV !== 'production') {
    console.log('Swagger scanned routes:', Object.keys(spec.paths));
    console.log('Swagger servers:', spec.servers);
    fs.writeFileSync(
      path.join(process.cwd(), 'public', 'debug-swagger.json'),
      JSON.stringify(spec, null, 2)
    );
  }

  return spec;
};
