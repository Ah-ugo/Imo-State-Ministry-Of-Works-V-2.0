/** @format */

'use client';

import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';
import { useEffect, useState } from 'react';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), {
  ssr: false,
});

export default function SwaggerPage() {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    fetch('/debug-swagger.json')
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched spec paths:', Object.keys(data.paths));
        console.log('Fetched spec servers:', data.servers);
        setSpec(data);
      })
      .catch((error) => console.error('Error fetching Swagger spec:', error));
  }, []);

  if (!spec) return <div className='p-4'>Loading API documentation...</div>;

  return (
    <div className='p-4'>
      <SwaggerUI
        spec={spec}
        tryItOutEnabled={true}
        displayOperationId={true}
        url='/debug-swagger.json'
        requestInterceptor={(req) => {
          if (req.url.includes('/api/v1/projects') && req.method === 'POST') {
            const token = localStorage.getItem('jwt_token');
            if (token) {
              req.headers['Authorization'] = `Bearer ${token}`;
            }
          }
          return req;
        }}
      />
    </div>
  );
}
