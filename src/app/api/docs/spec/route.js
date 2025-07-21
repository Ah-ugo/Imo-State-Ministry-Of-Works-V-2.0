/** @format */

import { getApiDocs } from '@/lib/swagger';
import { NextResponse } from 'next/server';

export async function GET() {
  const spec = getApiDocs();
  console.log('Generated spec paths:', Object.keys(spec.paths));
  console.log('Generated spec servers:', spec.servers);
  return NextResponse.json(spec);
}

export const dynamic = 'force-dynamic';
